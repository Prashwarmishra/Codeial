const express = require("express");
const app = express();
const port = 8000;

app.use('/', require('./routes'));


app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if (err){console.log(`There's been an error in connecting to the server: ${err}`); return;}
    console.log(`Yup, the server is Up and Running at the port: ${port}`);
})