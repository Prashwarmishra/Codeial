const express = require("express");
const app = express();
const port = 8000;
const layout = require('express-ejs-layouts');
const db = require("./config/mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require("connect-mongo")(session);
const sassMiddleWare = require('node-sass-middleware');

app.use(sassMiddleWare({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: "extended",
    prefix: '/css',
}))

app.use(layout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true)

app.use(express.urlencoded());
app.use(express.static('./assets'));



app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100),
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoReconnect: 'disabled',
    },
    function(err){
        console.log(err || 'mongoose connection okay.')
    })
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){console.log(`There's been an error in connecting to the server: ${err}`); return;}
    console.log(`Yup, the server is Up and Running at the port: ${port}`);
})