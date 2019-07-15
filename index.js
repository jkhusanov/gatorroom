// importing modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const busboy = require('connect-busboy');
const fs = require('fs-extra');

const Sequelize = require('sequelize');
const keys = require('./config/keys');
require('./services/passport');

const app = express();

// Registers and ensures existence of upload path
const uploadPath = path.join(__dirname, 'fileUpload/');
fs.ensureDir(uploadPath);

// Set 2MiB buffer
app.use(
  busboy({
    highWaterMark: 2 * 1024 * 1024,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// cookies
app.use(
  cookieSession({
    // How long cooke can exist inside of browser before it's automatically expired
    // 30 days in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // key to encrypt a cookie
    keys: [keys.cookieKey],
  })
);

const sequelize = new Sequelize(keys.database, keys.user, keys.password, {
  host: keys.host,
  dialect: 'mysql',
});

const Listing = sequelize.import('./models/Listing.js');

// const sequelize = new Sequelize(keys.database, keys.user, keys.password, {
//   host: keys.host,
//   dialect: 'mysql',
// });

// // Authentication Packages and Models handlers
// require('./models/Student')(sequelize);
// require('./models/Landlord')(sequelize);

app.use(passport.initialize());
app.use(passport.session());

// route handler
require('./routes/googleAuthRoutes')(app);
require('./routes/listingRoutes')(app);
require('./routes/listingUploadRoutes')(app);
require('./routes/landlordRoutes')(app);
require('./routes/adminRoutes')(app);

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Used to store image names
const fileName = [];

app.route('/api/upload').post((req, res) => {
  req.pipe(req.busboy);

  // Store files on folder
  req.busboy.on('file', (fieldname, file, filename) => {
    console.log(`Upload of '${filename}' started`);
    const fstream = fs.createWriteStream(path.join(uploadPath, filename));
    file.pipe(fstream);
    fileName.push(filename);

    fstream.on('close', () => {
      console.log(`Upload of '${filename}' finished`);
      res.redirect('back');
    });
  });

  // Add images' names to database row
  req.busboy.on('field', async (fieldname, value) => {
    try {
      await Listing.update(
        {
          image_1: fileName[0],
          image_2: fileName[1],
          image_3: fileName[2],
        },
        {
          where: {
            listing_id: value,
          },
        }
      );
      // res.send('Done');
      console.log('Added images to database');
      fileName.length = 0;
    } catch (err) {
      res.send('Error, please try again');
      console.log(err);
    }
  });
});

/**
 * WARNING
 * This script below is ONLY TO RUN ONCE TO UPDATE EXISTING LISTINGS
 * COMMENT OUT AFTER USING ONCE!!!
 * You MUST have images named 1.jpg, 2.jpg, and 3.jpg in fileUpload folder in root
 * It's not perfect and applies the same lat and long to all listings which have null lat and long
 */

// const options = {
//   provider: 'google',
//   apiKey: keys.googleLatLong,
//   formatter: null,
// };
// const NodeGeocoder = require('node-geocoder');

// const geocoder = NodeGeocoder(options);

// const updateExisting = async () => {
//   const rawData = await Listing.findAll({
//     where: {
//       lat: null,
//       long: null
//     }
//   });
//   const listings = JSON.parse(JSON.stringify(rawData, null, 4));

//   if (listings !== null) {
//     listings.map(async listing => {
//       // eslint-disable-next-line camelcase
//       const {
//         address,
//         city,
//         postal_code,
//         listing_id
//       } = listing;
//       try {
//         const result = await geocoder.geocode(address, city, postal_code);
//         const lat = result[0].latitude;
//         const long = result[0].longitude;
//         Listing.update({
//           lat,
//           long,
//           image_1: '1.jpg',
//           image_2: '2.jpg',
//           image_3: '3.jpg'
//         }, {
//           where: {
//             image_1: null,
//             image_2: null,
//             image_3: null,
//             listing_id,
//             lat: null,
//             long: null,
//           },
//         }).then(() => {
//           console.log('Done');
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     });
//   }
// };

// updateExisting();

// listen to this port, either server provided port or local port

/**
 * Runs code in production mode
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
