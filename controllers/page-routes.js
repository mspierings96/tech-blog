const router = require("express").Router();
const sequelize = require("../config/config");
// const { Post } = require("../models");
//
const postController = require("./api/post-routes");
router.get("/", async (req, res) => {
  // let postData = await Post.findAll();
  // postData = postData.map;
  let postData = await postController.getAll();
  console.log(postData);
  res.render("home", { posts: postData });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
