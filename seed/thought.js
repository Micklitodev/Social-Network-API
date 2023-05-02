const { Thought } = require("../models");

const seedThoughts = async () => {
  const newthought = await Thought.create({
    thought_content: 'I really like food.', 
    username: "mick122",
  });
  console.log(newthought)
}

module.exports = seedThoughts;
