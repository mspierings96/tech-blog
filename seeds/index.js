const seedsUsers = require("./user-seeds");
const seedsComments = require("./comment-seeds");
const seedsPosts = require("./post-seeds");
const sequelize = require("../config/config");

const seedAll = async () => {
  await sequelize.sync({
    force: true,
  });
  await seedsUsers();
  await seedsPosts();
  await seedsComments();

  process.exit(0);
};

seedAll();
