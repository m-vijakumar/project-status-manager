const passport = require('passport');

var GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User')

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


var githubAccessToken;

passport.use(new GitHubStrategy({
    clientID: "a66ec4d0e2639b9b6cd0",
    clientSecret: "7fa7b48763568aac9044135cc0550f64c8a5beae",
    callbackURL: "http://localhost:5000/api/auth/github/callback"
  },
 async function (accessToken, refreshToken, profile, done) {
    console.log(profile)

    console.log(profile.id)
    console.log(profile.displayName)

    console.log(accessToken)
    module.exports={
      githubAccessToken : accessToken

    }
    let userData ={
      githubId: profile.id,
      username : profile.username
     }
      await User.findOneAndUpdate({ githubId: profile.id },userData,{ upsert: true, new: true, setDefaultsOnInsert: true })
             .then((result)=>{
              return done(null, result);
            })
            .catch((err)=>{
              return done(err);
            })
     
  }
));

console.log("githubAccessToken", githubAccessToken)

module.exports={
  githubAccessToken : githubAccessToken
}