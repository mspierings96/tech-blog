const sequelize = require("../config/config");
const { Post } = require("../models");

const postData = [
  {
    post_text: "The new HP Laptop has much to be desired.",
    user_id: 3,
    title: "HP LAPTOP REVIEW",
  },
  {
    post_text:
      "There is much debate between the XBOX and Playstation products.",
    user_id: 3,
    title: "XBOX ONE COMPARISONS",
  },
  {
    post_text: "Artificial Intelligence is commonly referred to AI.",
    user_id: 3,
    title: "What is AI? And what does it mean for the future?",
  },
];

const seedsPosts = () => {
  Post.bulkCreate(postData, { individualHooks: true });
};

module.exports = seedsPosts;
