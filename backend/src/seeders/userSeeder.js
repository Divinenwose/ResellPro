const bcrypt = require('bcrypt');
const { User } = require('../models/User');

const users = [
  {
    name: 'Admin User',
    email: 'admin@resellpro.com',
    password: 'Admin123!',
    roles: ['admin'],
  }
];

const seedUsers = async () => {
  const results = [];

  for (const user of users) {
    const exists = await User.findOne({ email: user.email });
    if (exists) {
      results.push(`User ${user.email} already exists`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({ ...user, password: hashedPassword });
    await newUser.save();
    results.push(`User ${user.email} created`);
  }

  return results;
};

module.exports = seedUsers;
