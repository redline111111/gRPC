const {User} = require('./db/models/User.js');

async function findUserByPhone(phone) {
  try {
    const user = await User.findOne({
      where: { phone },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(user) {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    throw error
  }
}


module.exports = { findUserByPhone, createUser};