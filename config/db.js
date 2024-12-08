const mongoose = require('mongoose');
const config = require("config");

const MONGO_URI = config.get("mongoURI");
const connectDB = async() => {

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
}
  module.exports = connectDB;