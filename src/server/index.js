const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const mongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
//connect to db before everything
mongoose
  .connect(
    process.env.DATABASE_URI || "mongodb://localhost:27017/Lunar_Localhost",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

const mongoStore = new mongoDBStore({
  uri: process.env.DATABASE_URI || "mongodb://localhost:27017/Coffee_Eshop",
  collection: "sessions",
});
//session config
app.use(
  session({
    secret: process.env.SESSION_SECRET || "SPECIFY_YOUR_SECRET",
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1 day
      httpOnly: true,
      secure: true,
    },
    saveUninitialized: false,
    store: mongoStore,
  })
);

app.use(cors());
//enables receiving json trough req.body
app.use(express.json());
//enables receiving formData trough req.body
// app.use(express.urlencoded({ extended: true }));

const authRoute = require("./routes/auth");

app.use("/auth",authRoute);

//You need to specificy SERVER_PORT as key:value in .env file
app.listen(process.env.PORT || 5000, () => {
  console.log(`Web Server ~ ${process.env.PORT || 5000}`);
});
