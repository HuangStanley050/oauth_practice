const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'https://webdevpractice-infamousgodhand.c9users.io/auth/google/redirect'

    }, (accessToken, refreshToken, profile, done) => {
        console.log("You reached the passport callback");
        //console.log(profile);
        new User({
                username: profile.displayName,
                googleId: profile.id
            }).save()
            .then(newUser => console.log(newUser))
            .catch(err => console.log(err));
    })

);
