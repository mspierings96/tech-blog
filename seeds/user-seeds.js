const sequelize = require("../config/config");
const { User } = require("../models");

const userData = [
  {
    username: "texas123",
    email: "texas@gmail.com",
    password: "dallas",
  },
  {
    username: "wisconsin1864",
    email: "wisconsin@gmail.com",
    password: "madison",
  },
  {
    username: "arkansas76",
    email: "ozark@gmail.com",
    password: "littlerock",
  },
];

const seedsUsers = () => {
  User.bulkCreate(userData, { individualHooks: true });
};

module.exports = seedsUsers;
