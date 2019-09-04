const router = require('express').Router();
const passport = require('passport');
let userDetails = require('../userDetails');
//auth login
router.get('/login', (req, res) => {
    res.render('login')
})

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    req.logout();
    require('../userDetails').id = '';
    require('../userDetails').name = ''
    res.redirect('/');
})

//google auth
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

//github auth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

//callback route for google auth
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('req in redirect', req.user);
    userDetails.id = req.user.id;
    userDetails.name = req.user.username;
    res.redirect('/profile')
})

//callback route for github auth
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    console.log('req in redirect', req.user);
    userDetails.id = req.user.id;
    userDetails.name = req.user.username;
    res.redirect('/profile')
})

module.exports = router;
