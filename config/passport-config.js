const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , User = require('../model/User')

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:4000/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'name','emails','gender','profileUrl']
  },
  async (accessToken, refreshToken, profile, done) =>{
      console.log(profile)
    const newUser = {
        fbId : profile.id,
        displayName : profile.displayName,
        firstName : profile.name.givenName,
        lastName : profile.name.familyName,
        photo : profile.photos[0].value
    }

    try {
        let user = await User.findOne({fbId: profile.id})
        if(user){
            done(null, user)
        }
        else {
            user = await User.create(newUser)
            done(null,user)
        }
    } catch (err) {
        console.log(err)
    }
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});