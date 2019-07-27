const mysql = require('mysql');
const keys = require('../config/keys');

// Connection to database
// Production keys are stored in config directory, local dev keys are not pushed to server

const dbConfig = {
  host: keys.host,
  user: keys.user,
  password: keys.password,
  database: keys.database,
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function(err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

module.exports = app => {
  app.post('/api/all_listings', (req, res) => {
    connection.query('SELECT * FROM listing', (err, rows) => {
      if (err) throw err;
      const listingJSON = JSON.parse(JSON.stringify(rows));
      res.send(listingJSON);
    });
  });

  app.post('/api/listing_details', (req, res) => {
    const { listingID } = req.body;
    connection.query('SELECT * FROM listing WHERE listing_id = ?', [listingID], (err, rows) => {
      if (err) throw err;
      const listingJSON = JSON.parse(JSON.stringify(rows));
      res.send(listingJSON);
    });
  });

  app.post('/api/search_apartment', (req, res) => {
    const search = req.body.searchParams;
    connection.query(
      'SELECT * FROM listing WHERE city LIKE ? OR postal_code LIKE ?',
      ['%' + search + '%', '%' + search + '%'],
      (err, rows) => {
        if (err) throw err;
        const listingJSON = JSON.parse(JSON.stringify(rows));
        res.send(listingJSON);
      }
    );
  });

  app.post('/api/landlord_listings', (req, res) => {
    const id = req.body.landlordID;
    connection.query(
      'SELECT L1.* FROM listing L1, landlord LL1, landlord_has_listing LHL1 WHERE L1.listing_id = LHL1.listing_id AND LHL1.landlord_id = LL1.landlord_id AND LL1.landlord_id = ?',
      [id],
      (err, rows) => {
        if (err) throw err;
        const listingJSON = JSON.parse(JSON.stringify(rows));
        res.send(listingJSON);
      }
    );
  });

  app.post('/api/listing_landlord', (req, res) => {
    const id = req.body.listingID;
    connection.query(
      'SELECT LL1.* FROM listing L1, landlord LL1, landlord_has_listing LHL1 WHERE LL1.landlord_id = LHL1.landlord_id AND LHL1.listing_id = L1.listing_id AND L1.listing_id = ?',
      [id],
      (err, rows) => {
        if (err) throw err;
        const landlordJSON = JSON.parse(JSON.stringify(rows));
        res.send(landlordJSON);
      }
    );
  });
};
