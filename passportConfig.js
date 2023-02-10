const LocalStrategy = require("passport-local");
const User = require("./user");

exports.initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) return done(null, false);

        if (user.password !== password) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      console.log("deserializeUser");
      const user = await User.findById({ _id: id });
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
