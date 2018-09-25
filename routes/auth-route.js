var express = require('express');
const passport = require("passport");
var router = express.Router();

router.get("/login", (req, res) => {
    //res.send("Auth route");
    res.render("login");
});

router.get("/logout", (req, res) => {
    //res.send("Auth route");
    res.send("logout");
});

router.get("/google", passport.authenticate('google', { scope: ['profile'] }));

router.get("/google/redirect", passport.authenticate('google'), (req, res) => {

    //res.send(req.user);
    res.redirect('/profile');
});


module.exports = router;
