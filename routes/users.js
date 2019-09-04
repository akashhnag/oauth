const router = require('express').Router();
const userDetails = require('../userDetails');

const authCheck = (req, res, next) => {
    if (userDetails.name == '' || userDetails.id == '') {
        res.redirect('/auth/login')
    }
    else {
        next();
    }
}
router.get('/', authCheck, (req, res) => {
    console.log('user details', userDetails);
    res.render('profile', { user: userDetails });

})

module.exports = router;
