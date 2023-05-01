const seedUsers = require('./userseed');

const seedAll = async () => {

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');


  process.exit(0);
};

seedAll();