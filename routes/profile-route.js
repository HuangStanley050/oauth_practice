var express = require('express');
const passport = require("passport");
var router = express.Router();

router.get("/", (req, res) => {
    res.send("profile page");
});

module.exports = router;
