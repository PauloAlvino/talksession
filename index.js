const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const app = express();
const conn = require("./db/conn");

const Talk = require("./models/Talk");
const User = require("./models/User");

const talksRoutes = require("./routes/talksRoutes");
const TalksController = require("./controllers/TalksController");
const authRoutes = require("./routes/authRoutes");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(
  session({
    name: "session",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }
  next();
});

app.use("/", authRoutes);
app.use("/", TalksController.showTalks);
app.use("/talks", talksRoutes);

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
