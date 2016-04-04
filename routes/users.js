var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var mongoose = require('mongoose');

/* GET business listing. */
router.get('/', function(req, res, next) {

    Article.find(function (err, articles) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // we got data back
            // show the view and pass the data to it
            res.render('articles/index', {

                title: 'Articles',
                articles: articles
            });
        }
    });
});


module.exports = router;
