const express = require("express");
const passport = require("passport");
const appApiController = require("../controllers/appApiController");
const userController = require("../controllers/user.js");


var appApi = express.Router();

/*
appApi.use(function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).send("Not authorized!");
  } else {
  next();
  }
});
*/


//appApi.get('/start', wizardController.getStart);
//appApi.post('/start',wizardController.postStart);
appApi.get('/users/:userid/profile', userController.getWizardProfile);
appApi.post('/users/:userid/profile', userController.createWizardProfile);

module.exports = appApi;
