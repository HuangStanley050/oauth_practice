const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => console.log(err));

});

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'https://webdevpractice-infamousgodhand.c9users.io/auth/google/redirect'

    }, (accessToken, refreshToken, profile, done) => {
        console.log("You reached the passport callback");
        //console.log(profile);
        User.findOne({ googleId: profile.id })
            .then(currentUser => {
                if (currentUser) {
                    console.log("User existed: " + currentUser);
                    done(null, currentUser);
                }
                else {
                    new User({
                            username: profile.displayName,
                            googleId: profile.id
                        }).save()
                        .then(newUser => {
                            console.log(newUser);
                            done(null, newUser);
                        })
                        .catch(err => console.log(err));

                }

            })
            .catch(err => console.log(err));


    })

);
