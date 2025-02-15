const express = require("express");
const path = require("path");
const app = express();
const user_model = require("./models/user_model");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("create_user");
});

app.post("/create", async (req, res) => {
  try {
    let { name, email, image } = req.body;
    await user_model.create({
      name,
      image,
      email,
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.get("/view_users", async (req, res) => {
  let all_users = await user_model.find();
  res.render("view_users", { users: all_users });
});

app.get("/delete/:id", async (req, res) => {
  let deleted_user = await user_model.findOneAndDelete({ _id: req.params.id });
  console.log(`${deleted_user} deleted`);
  res.redirect("/view_users");
});

app.get("/update_user/:id", async (req, res) => {
  let user = await user_model.findOne({ _id: req.params.id });
  res.render("update_user", { user });
});

app.post("/update/:id", async (req, res) => {
  let { name, email, image } = req.body;
  if (name.trim().length > 0) {
    await user_model.findOneAndUpdate(
      { _id: req.params.id },
      { name },
      { new: true }
    );
  }
  if (email.trim().length > 0) {
    await user_model.findOneAndUpdate(
      { _id: req.params.id },
      { email },
      { new: true }
    );
  }
  if (image.trim().length > 0) {
    await user_model.findOneAndUpdate(
      { _id: req.params.id },
      { image },
      { new: true }
    );
  }
  res.redirect("/view_users");
});

app.listen(3000, () => {
  console.log("Server is running");
});
