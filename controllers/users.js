const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');
// const controller = require('./controller');
const auth = require('../services/auth');

// ----------------------------------------
// users index

router.post(
    '/',
    // we want the behavior of the site to vary depending on whether or
    // not the user is already logged in. If they are logged in, we want
    // to send them to /users/profile. If they are not, we want to send
    // them to users/new.
    passport.authenticate(
        // The following string indicates the particular strategy instance
        // we'll want to use to handle signup. We defined behavior for
        // 'local-signup' back in index.js.
        'local-signup', {
        failureRedirect: '/newsington/users/login',
        successRedirect: '/newsington/users/profile'
        }
    )
);

// ----------------------------------------
// register new user

router.get('/signup', (req, res) => {
    res.render('signup');
});

// ----------------------------------------
// user logout

router.get('/logout', (req, res) => {
    // passport put this method on req for us
    req.logout();
    // redirect back to index page
    res.redirect('/');
});

// ----------------------------------------
// user login

router.get('/login', (req, res) => {
    res.render('login');
});

// passport.authenticate will _build_ middleware for us
// based on the 'local-login' strategy we registered with
// passport in auth.js
router.post('/login', passport.authenticate(
    'local-login', {
        failureRedirect: '/newsington/users/login',
        successRedirect: '/newsington/users/profile'
    }
));
// ----------------------------------------
// update existing user

router.get('/update', User.findByEmailMiddleware,  (req, res) => {
    //res.json(res.locals.userData)
     res.render('update', {data: res.locals.userData});
});

// ----------------------------------------

router.put('/update', User.update,  (req, res) => {
    //res.json(res.locals.userData)
     res.render('profile', {data: res.locals.userData});
});

router.delete('/delete', User.destroy,  (req, res) => {
    console.log('hasta la vista')
    //res.json(res.locals.userData)
});

// ----------------------------------------
// user profile

router.get(
    '/profile',
    // Middleware (that we wrote) ensuring that if the user is not
    // authenticated, he or she will be redirected to the login screen.
    auth.restrict,
    User.findByEmailMiddleware,
    (req, res) => {
        console.log('in handler for users/profile');
        console.log('req.user:');
        console.log(req.user);
        res.render('profile', { data: res.locals.userData });
    }
);

module.exports = router;