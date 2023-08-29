const mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'MyDB';
const dbURI = `mongodb://${server}/${database}`; 

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
