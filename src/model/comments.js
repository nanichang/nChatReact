// comments.js
// Created by Nanichang
'use strict'

// Import dependencies
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Create a new instance of the mongoose.Schema
let CommentsSchema = new Schema({
    author: String,
    text: String
});

// Export module to use in server.js

module.exports = mongoose.model('Comment', CommentsSchema);