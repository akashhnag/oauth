const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
const keys = require('./keys');
const User1 = require('../models/user_models').User1;
const User2 = require('../models/user_models').User2;
//serialize user in a cookie
passport.serializeUser((user, done) => {
    done(null, user._id)
})

//deserialize user
passport.deserializeUser((id, done) => {
    User1.findById(id, (user) => {
        done(null, user);
    })
})
//var GoogleStrategy = require('passport-google-oauth2').Strategy;

//google strategy
passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    //passport callback function
    User1.findOne({ googleID: profile.id }, (err, user) => {
        if (err) {
            console.log('problem finding', err);

        }
        else {
            if (user) {
                console.log('User already present');
                done(null, user)
            }
            else {
                let user = new User1({
                    username: profile.displayName,
                    googleID: profile.id
                })
                user.save((err, returnuser) => {
                    if (err) {
                        console.log('unable to create user', err);

                    }
                    else {
                        console.log('user created successfully', user);
                        done(null, returnuser);
                    }
                })
            }
        }
    })

}))

//github strategy
passport.use(new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: "/auth/github/redirect"
},
    function (accessToken, refreshToken, profile, done) {
        console.log('github profile', profile);

        User2.findOne({ githubID: profile.id }, (err, user) => {
            if (err) {
                console.log('problem finding', err);

            }
            else {
                if (user) {
                    console.log('User already present');
                    done(null, user)
                }
                else {
                    let user = new User2({
                        username: profile.username,
                        githubID: profile.id
                    })
                    user.save((err, returnuser) => {
                        if (err) {
                            console.log('unable to create user', err);

                        }
                        else {
                            console.log('user created successfully', user);
                            done(null, returnuser);
                        }
                    })
                }
            }
        })
    }
));
