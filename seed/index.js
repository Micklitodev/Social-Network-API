const mongodb = require('../config/connection')
const seedUsers = require('./userseed');
const seedThoughts = require('./thought')

const seedAll = async () => {

  mongodb.once('open', () => console.log('connected to db for seeding') )

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedThoughts(); 
  console.log('\n----- THOUGHTS SEEDED -----\n')


  process.exit(0);
};

seedAll();