// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(3000, function () {
    console.log('listening on 3000');
});
// Connect to the db
MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
    if (err) throw err;
    var db = client.db('commentDB');
    var comments = db.collection('comments');
    console.log('Connected to the database');
    app.get('/', function (req, res) {
        comments.find().toArray(function (err, result) {
            if (err) throw err;
            res.render('index', { comments: result });
        });
    });
    app.post('/comments', function (req, res) {
        comments.insertOne(req.body, function (err, result) {
            if (err) throw err;
            res.redirect('/');
        });
    });
});