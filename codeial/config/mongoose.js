const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/production_db");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'There was an error while connecting the server to the database.'));
db.once('open', function(){
    console.log("The server is successfully connected to the ::mongodb database.");
})

module.exports = db;