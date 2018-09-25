var express = require('express');
const passport = require("passport");
var router = express.Router();

const authcheck = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.redirect("/auth/login");
    }
};

router.get("/", authcheck, (req, res) => {
    //res.send("You have logged in: " + req.user.username);
    res.render('profile', { user: req.user });
});

module.exports = router;
