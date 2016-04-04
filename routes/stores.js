// link to dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

//link to store model
var Store = require('../models/store');

//set up get handler for password protected store page
router.get('/', isLoggedIn, function (req, res, next) {
    //use the store model to get directory listing
    Store.find(function (err, stores) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show we got data back, show the view and pass the data through it
            res.render('stores/index', {
                title: 'Pet Store Directory',
                stores: stores
            });
        }
    })
});

// get handler for add to display a blank form
router.get('/add', isLoggedIn, function (req, res, next) {
    res.render('stores/add', {
        title: 'Add a new Pet Store'
    });
});

// post handler for adding to the form
router.post('/add', isLoggedIn, function (req, res, next) {

    //save new pet store
    Store.create({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            website: req.body.website
        }
    );

    // redirect to auth store page
    res.redirect('/stores');
});

//get handler for edit to show content from entry
router.get('/id', isLoggedIn, function(req, res, next){
   //create id variable to the store id from the url
    var id = req.params.id;
    
    //look up the selected store
    Store.findById(id, function(err, store){
       if (err) {
           console.log(err);
           res.end(err);
       } 
        else {
           //show edit form
           res.render('stores/edit', {
              title: 'Store Details',
               store: store
           });
       }
    });
});

//post handler for edit to update the store
router.post('/id', isLoggedIn, function(req, res, next){
    //create id variable to the store id from the url
    var id = req.params.id;

    //fill the store object
    var store = new Store({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        website: req.body.website
    });

    //use mongoose and store model to update
    Store.update( {_id: id}, store, function(err){
       if   (err){
           console.log(err);
           res.end(err);
       }
        else {
           res.redirect('/stores')
       }
    });
});

//get handler for delete using the store id
router.get('/delete/:id', isLoggedIn, function(req, res, next){
    //get id variable to the store id from the url
    var id = req.params.id;

    console.log('trying to delete');

    Store.remove({_id: id}, function(err){
       if (err) {
           console.log(err);
           res.end(err);
       }
        else {
           // show updated article list
           res.redirect('/stores');
       }
    });
});

//authorization check
function isLoggedIn(req, res, next) {

    //is the user authenticated
    if (req.isAuthenticated()){
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
}

// make public
module.exports = router;
