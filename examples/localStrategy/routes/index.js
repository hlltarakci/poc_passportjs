var express = require('express');
const passport = require('passport');
const User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { user : req.user });
});

// register
router.get('/register', (req, res) => {
  res.render('register', { });
});

router.post('/register', (req, res, next) => {
  User.register(new User({ username : req.body.username }), req.body.password, (err, user) => {
      if (err) {
        return res.render('register', { error : err.message });
      }

      passport.authenticate('local')(req, res, () => {
          req.session.save((err) => {
              if (err) {
                  return next(err);
              }
              res.redirect('/');
          });
      });
  });
});

router.get('/login', (req, res) => {
  res.render('login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
  req.session.save((err) => {
      if (err) { 
          return next(err);
      }
      res.redirect('/');
  });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.save((err) => {
      if (err) {
          return next(err);
      }
      res.redirect('/');
  });
});

module.exports = router;
