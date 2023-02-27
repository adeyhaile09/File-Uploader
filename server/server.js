const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models');
const app = express();
const initRoutes = require('./routes/upload.routes');

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

global.__basedir = __dirname;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to file upload application.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
