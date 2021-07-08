const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbs = '';

mongoose.connect(`mongodb://localhost/${dbs}`, {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Mongo connected!')
});


module.exports = {

}