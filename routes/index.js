var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/login', (req, res) => {
  const username = req.query.username;
  res.render('login', { message: { 
                                    error: req.flash('error'),
                                    usernameErr: req.flash('username'),
                                    passwordErr: req.flash('password'),
                                    username
                                  }
                      });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: `/login?username=${req.body.username}`,
                                   failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
