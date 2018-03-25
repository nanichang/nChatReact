// Server.js
// Created by Nanichang

'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Comment = require('./src/model/comments')

// Create instances
let app = express();
let router = express.Router();

// Setting port
let port = process.env.API_PORT || 3003;

//MongoDB config
let mongoDB = 'mongodb://nanipaul:nani@ds221339.mlab.com:21339/reactmern';
mongoose.connect(mongoDB)
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error'));

// Configure API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Prevent errors from Cross Origin Resource Sharing
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Set route path and initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!' });
});

//adding the /comments route to our /api router
router.route('/comments')
//retrieve all comments from the database
.get(function (req, res) {
    //looks at our Comment Schema
    Comment.find(function (err, comments) {
        if (err)
            res.send(err);
        //responds with a json object of our database comments.
        res.json(comments)
    });
})
//post new comment to the database
.post(function (req, res) {
    var comment = new Comment();
    //body parser lets us use the req.body
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'Comment successfully added!' });
    });
});


// User router configuration when call /api
app.use('/api', router);

// Starts the server and listen for request
app.listen(port, function() {
    console.log(`nChat mern-react-app server started on ${port}`);
})