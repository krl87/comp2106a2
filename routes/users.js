var express = require('express');
var router = express.Router();
//connect to store model
var Store = require('../models/store');
var mongoose = require('mongoose');

/* GET store listing. */
router.get('/', function(req, res, next) {

    Store.find(function (err, stores) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {

            // we have the data, now show the view and pass the data to it
            res.render('users', {

                title: 'Pet Store Directory',
                stores: stores
            });
        }
    });
});

//JSON output
router.get('/api', function(req, res, next) {

    Store.find(function (err, stores) {
        // if we have an error
        if (err) {
            console.log(err);
            res.send({error: err});
        }
        else {

            // we have the data, now show the view and pass the data to it
            res.send({stores: stores});
        }
    });
});

module.exports = router;
