const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');



// mongoose connect

mongoose.connect('mongodb://localhost/sportblogs');
const db = mongoose.connection;


 // port
 const port = 3000;

 // init app
 const app = express();

// routes
const index = require('./routes/index');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const manage = require('./routes/manage');


// set the views

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','pug');

// moment
app.locals.moment = require('moment');
// body parser middleware


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set static folder
app.set(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// express session

app.use(session({
  secret : 'secret',
  resave : false,
  saveUninitialized : true
}));
// express messages

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// express Validator

app.use(expressValidator({
  errorFormatter :function(param, msg, value){
    const nameSpace = param.split('.')
    , root = nameSpace.shift()
    , formParam = root;
    while (nameSpace.length) {
      formParam += '[' + nameSpace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));
app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);

app.listen(port , () => {
  console.log('server is running on port... ' + port);
});
