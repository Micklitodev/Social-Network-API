const { User } = require("../models");

const seedUsers = async () => {
  const newuser = await User.create({ name: "mick", age: 28 });
  console.log(newuser);

};


module.exports = seedUsers;
