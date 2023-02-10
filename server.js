const express = require("express");
const app = express();
const connectDB = require("./database");
const User = require("./user");
const passport = require("passport");
const { initializingPassport } = require("./passportConfig");
const expressSession = require("express-session");
const cookieparser = require("cookie-parser");
const checkAuthenticated = require("./isAuth");
connectDB();
initializingPassport(passport);

app.use(express.json());
app.use(expressSession({ secret: "secret" }));
app.use(passport.initialize());
app.use(passport.session());
// app.use((req, res, next) => {
//   console.log("session ", req.session);
//   console.log("user ", req.user);
//   next();
// });
app.use(cookieparser());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/registor", async (req, res) => {
  console.log("registor " + req.body);
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).send("User already exists");
  }
  const newUser = await User.create(req.body);
  res.status(201).send(newUser);
});

app.post("/login", passport.authenticate("local"), function (req, res) {
  res.json({ data: req.user });
});

app.post("/login/check", checkAuthenticated, function (req, res) {
  // console.log("/login/check");
  // console.log(req.user);
  res.json({ data: req.user });
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
