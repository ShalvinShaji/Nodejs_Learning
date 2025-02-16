const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(cookieParser());

app.get("/", (req, res) => {
  let token = jwt.sign({ email: "test@gmail.com" }, "secret");
  console.log(` token from home page : ${token}`);
  res.cookie("token", token);
  res.send("Im ready");
});

app.get("/read", (req, res) => {
  console.log(` token from read page : ${req.cookies.token}`);
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data);

  res.send("In read page");
});

app.listen(3000, () => {
  console.log("Server is running..");
});
