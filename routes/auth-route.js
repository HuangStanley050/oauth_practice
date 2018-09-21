var express = require('express');
var router = express.Router();

router.get("/login", (req, res) => {
    //res.send("Auth route");
    res.render("login");
});

router.get("/logout", (req, res) => {
    //res.send("Auth route");
    res.send("logout");
});

router.get("/google", (req, res) => {
    //res.send("Auth route");
    res.send("goolg login");
});


module.exports = router;
