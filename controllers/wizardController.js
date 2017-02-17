const passport = require('passport');
const User = require('../models/User');
const userController = require('../controllers/user.js');

exports.getStart = (req, res) => {
  var inputData = null;
  if (req.session.inputData){
    inputData = req.session.inputData;
    req.session.inputData = null;
  }
  res.render('wizard/start', {
    title: 'Start Wizard',
    inputData: inputData
  });
};

exports.postStart = (req, res, next) => {
  req.assert('firstName', 'First Name is required').notEmpty();
  req.assert('lastName', 'Last Name is required').notEmpty();
  req.assert('address', 'Address is required').notEmpty();
  req.assert('city', 'City is required').notEmpty();
  req.assert('state', 'State is required').notEmpty();
  req.assert('zip', 'Zip is required').notEmpty();
  req.assert('county', 'County is required').notEmpty();

  const errors = req.validationErrors();

  //Store input values so we can pass to redirect if necessary to persist
  //values from prior submit
  var inputData = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    county: req.body.county
  };

  if (errors) {
    req.flash('errors', errors);
    req.session.inputData = inputData;
    return res.redirect('/wizard/start');
  }

  //Save data to user.wizardProfile
  else {
    userController.createWizardProfile(req, res);
  }

};
