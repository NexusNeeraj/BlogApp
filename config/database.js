const mongoose = require('mongoose');

require("dotenv").config();

const connectWithDb = () => {
      mongoose.connect(process.env.DATABASE_URL)
      .then(() => {
            console.log('Connected to databse successfully!');
      })
      .catch((error) => {
            console.log('Issues in db connection');
            console.error(error.message);
            process.exit(1);
      });
};

module.exports = connectWithDb;