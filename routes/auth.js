var express = require('express');
var router = express.Router();

//add auth package refs
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');
var gitHub = require('passport-github2');
var configDb = require('../config/db.js');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, user) {
        done(err, user);
    });
});

//github auth config
passport.use(new gitHub({
    clientID: configDb.githubClientId,
    clientSecret: configDb.githubClientSecret,
    callbackUrl: configDb.githubCallBackUrl
}, function(accessToken, refreshToken, profile, done) {
    var searchQuery = { name: profile.displayName };

    /* var updates = {
        name: profile.displayName,
        someID: profile.id
    }; */

}
));

// GET github login
router.get('/github', passport.authenticate('github', { scope: ['user.email'] }));

// GET github callback
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/auth/login'}),
    function(req, res) {
        res.redirect('/articles');
    }
);

// GET register - show registration form
router.get('/register', function(req, res, next){
    res.render('auth/register', {
        title: 'Register'
    });

});

// POST register - save new user
router.post('/register', function(req, res, next){
    /* Try to create a new account using our Account model and the form values
    if we get an error display the register form again
    if registration works, store the user and show the articles main page */
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            res.render('auth/register', { title: 'Register'});
        }
        else {
            req.login(account, function(err) {
                res.redirect('/articles');
            });
        }
    });
});

// GET login - show login form
router.get('/login', function(req, res, next){

    // store the session messages in a local variable
    var messages = req.session.messages || [];
    req.session.messages = [];

    // show the login page and pass in any messages we may have
    res.render('auth/login', {
        title: 'Login',
        user: req.user,
        messages: req.session.messages || []
    });

    // clear out session messages after
    req.session.messages = [];
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/articles',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'
}));

//make this public
module.exports = router, passport;
