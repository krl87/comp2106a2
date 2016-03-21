var express = require('express');
var router = express.Router();

// link to account model
var Account = require('../models/account');


// set up the GET handler for the main users page
router.get('/',isLoggedIn , function (req, res, next) {

    // use the account model to retrieve all users
    Account.find(function (err, accounts) {

        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {

            // populate data, show the view and pass the data to it
            res.render('users', {
                title: 'Users',
                users: accounts
            });
        }
    });
});

//auth check
function isLoggedIn(req, res, next) {
    //is the user authenticated>
    if (req.isAuthenticated()) {
        return next;
    }
    else {
        res.redirect('/auth/login');
    }
}


module.exports = router;
