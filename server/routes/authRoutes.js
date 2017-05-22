const authRouter = require('express').Router();
const passport = require('passport');
const moment = require('moment');

const User = require('../models/user');

const callbackHandler = (req, res) => {
  /**
   * Set some cookie data and send the appropriate response code
   */
  const userObj = new User({
    oauth_provider: req.user.provider,
    provider_id: req.user.id,
  });
  userObj.fetch(/* { withRelated: 'attendee.event' } */)
    .then((model) => {
      const maxAge = moment().add(7, 'days');
      if (model) {
        req.session.user_id = model.get('id');
        req.session.cookie.maxAge = maxAge;
        /**
         * TODO Add an events cookie. Depends on attendee table being populated.
         * Events cookie is an object of { event_id, user_role }
         */
        res.cookie('userId', model.get('id'), { maxAge });
        res.cookie('displayName', model.get('display_name'), { maxAge });
        res.cookie('events', undefined /* FIXME */, { maxAge });

        res.send(`Found ${JSON.stringify(model)} in the database`);
      } else {
        userObj.set({ display_name: req.user.displayName }).save()
          .then((model) => {
            req.session.user_id = model.get('id');
            req.session.cookie.maxAge = maxAge;
            res.cookie('userId', model.get('id'), { maxAge });
            res.cookie('displayName', model.get('display_name'), { maxAge });
            res.send(`Added ${JSON.stringify(model)} to the database`);
          });
      }
    });
};

authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
authRouter.get('/auth/facebook', passport.authenticate('facebook'))


authRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/fail' }),
  callbackHandler);

authRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/fail' }),
  callbackHandler);

authRouter.get('/auth/loggedIn', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('true');
  } else {
    res.send('false');
  }
});

authRouter.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    res.status(500).send();
  });
  console.log(req.cookies);
  Object.keys(req.cookies).forEach(cookie => res.clearCookie(cookie));
  // res.clearCookie('userId', 'displayName', 'events')
  res.redirect('/');
});

module.exports = authRouter;
