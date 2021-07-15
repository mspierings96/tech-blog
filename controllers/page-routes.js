const router = require("express").Router();
const sequelize = require("../config/config");
const { Post, Comment, User } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "post_text", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((response) => JSON.parse(JSON.stringify(response)))
    .then((posts) => res.render("home", { posts }));
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["post_text", "title", "created_at", "id"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // let postData = { ...dbPostData.dataValues };
      // postData.comments = postData.comments.map(
      //   (comment) => comment.dataValues
      // );
      // postData.user = postData.user.dataValues;
      // return postData;
      return JSON.parse(JSON.stringify(dbPostData));
    })
    .then((dbPostData) => {
      console.log(dbPostData);
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.render("post", dbPostData);
      // res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
