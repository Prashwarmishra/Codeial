const express = require("express");
const app = express();
const port = 8000;
const layout = require('express-ejs-layouts');
const db = require("./config/mongoose");


app.use(layout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true)

app.use(express.urlencoded());
app.use(express.static('./assets'));

app.use('/', require('./routes'));


app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if (err){console.log(`There's been an error in connecting to the server: ${err}`); return;}
    console.log(`Yup, the server is Up and Running at the port: ${port}`);
})