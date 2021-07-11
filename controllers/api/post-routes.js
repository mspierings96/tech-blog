const router = require("express").Router();
const sequelize = require("../../config/config");
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
// router.get("/", (req, res, next) => {
const getAll = (req, res, next) => {
  console.log("======================");
  return Post.findAll({
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
  }).then((response) => response.map((post) => post.dataValues));
  // .then((dbPostData) => res.json(dbPostData))
  // .then((dbPostData) => next(dbPostData))
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).json(err);
  // });
};
module.exports = {
  getAll,
};

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["post_text", "title", "date"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "date"],
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
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.put("/upvote", withAuth, (req, res) => {
//   // custom static method created in models/Post.js
//   Post.upvote(
//     { ...req.body, user_id: req.session.user_id },
//     { Vote, Comment, User }
//   )
//     .then((updatedVoteData) => res.json(updatedVoteData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_text: req.body.post_text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// module.exports = router;
