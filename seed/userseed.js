const { User } = require("../models");

const seedUsers = async () => {
  const newuser = await User.create({
    username: "mick122",
    email: "micklito.dev@gmail.com",
  });
  console.log(newuser);
};

module.exports = seedUsers; 
