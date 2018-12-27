var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// init app
const app = express();
// port
const port = 3000;

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/todoapp';


// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

// set the views
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
// connect our mongodb

MongoClient.connect(url,{ useNewUrlParser: true },function(err,database){
	console.log("mongodb is connected ...");
  if(err) throw err;
  db = database;
  Todos = db.collection('todos');
  app.listen(port,() => {
    console.log('server running on port'+port);
   });
});

app.get('/', (req, res, next) => {
  Todos.find({}).toArray((err, todos) => {
    if(err){
      return console.log(err)
    }
    //console.log(todos);
    res.render('index',{
      todos : todos
    });

  });
});
app.post('/todo/add', (req, res, next) => {
  // create todo
  const todo = {
    text : req.body.text,
    body : req.body.body
  }
  // insert the todo into our database
  Todos.insert(todo, (err, result) => {
    if(err){
      throw err;
    }
    console.log('todo has been inserted');
    res.redirect('/');
  });
});
app.delete('/todo/delete/:id', (req, res, next) => {
  const query = {_id : ObjectID(req.params.id)}
  Todos.deleteOne(query, (err, response) =>{
    if(err){
      return console.log(err);
    }
    console.log('todos removed');
    res.send(200);
  });
});
app.get('/todo/edit/:id', (req, res, next) => {
  const query = {_id : ObjectID(req.params.id)}
  Todos.find(query).next((err, todo) => {
    if(err){
      return console.log(err)
    }
    //console.log(todos);
    res.render('edit',{
      todo : todo
    });
  });
});
app.post('/todo/edit/:id', (req, res, next) => {
  const query = {_id : ObjectID(req.params.id)}
  // create todo
  const todo = {
    text : req.body.text,
    body : req.body.body
  }
  // update the todo into our database
  Todos.updateOne(query, {$set:todo}, (err, result) => {
    if(err){
      throw err;
    }
    console.log('todo has been updated');
    res.redirect('/');
  });
});
