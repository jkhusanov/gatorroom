const mysql = require('mysql');
const keys = require('../config/keys');

// Connection to database
// Production keys are stored in config directory, local dev keys are not pushed to server
const connection = mysql.createConnection({
  host: keys.host,
  user: keys.user,
  password: keys.password,
  database: keys.database,
});

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

  app.get('/api/maps_key', (req, res) => {
    res.send(keys.googleLatLong);
  });
};
