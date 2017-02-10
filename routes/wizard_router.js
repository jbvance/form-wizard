const express = require("express");
const passport = require("passport");
var wizardController = require("../controllers/wizardController")


var wizard = express.Router();

wizard.use(function(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('errors', {msg: "Please login to view the requested page."});
    return res.redirect('/login');
    //res.status(401).send("Not authorized!");
  } else {
  next();
  }
});

wizard.get('/start', wizardController.getStart);
wizard.post('/start',wizardController.postStart);

module.exports = wizard;
