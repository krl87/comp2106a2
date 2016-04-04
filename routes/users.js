var express = require('express');
var router = express.Router();
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
            // we got data back
            // show the view and pass the data to it
            res.render('stores/index', {

                title: 'Pet Store Directory',
                stores: stores
            });
        }
    });
});


module.exports = router;
