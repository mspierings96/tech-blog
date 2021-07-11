const sequelize = require("../config/config");
const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "The new HP Laptop has much to be desired.",
    user_id: 3,
    post_id: 2,
  },
  {
    comment_text:
      "The XBOX One has a much more user interactive friendly playing experience than any Sony/Playstation product.",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text:
      "Artificial Intelligence is said to be the society altering technology of tomorrow.",
    user_id: 1,
    post_id: 3,
  },
];

const seedsComments = () => {
  Comment.bulkCreate(commentData, { individualHooks: true });
};

module.exports = seedsComments;
