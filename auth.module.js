const bcrypt = require('bcrypt');
const { createUser, findUserByPhone } = require('./user.entity');
const  jwt = require('jsonwebtoken');

async function signToken(id, phone, hash, secret, expiresIn) {
    return jwt.sign({ id, phone, hash }, secret, { expiresIn });
}

async function registerWithoutDescript(data) {
    return {
        status: 200,
        message: {
          id: '66110f87-b8ff-4a76-940e-e2cb9145003a',
          discription: '',
          notificationToken: '',
          status: 0,
          messages_count: 0,
          first_name: 'sadasd',
          phone: '+79659688232',
          second_name: 'AAAA',
          last_name: 'Vladimirovich',
          login: 'User30',
          hash: '$2b$10$BaYHGWDLZmvNRvh1cRr0EeAA9ZiD1EZb8WnhjqMnHhKfewfLZATqq',
          icon: null,
          secret_key: null,
          vox: null,
          vox_pwd: null,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2zc5NjU5Njg4MjMyIiwiaGFzaCI6ImFzZGFzZGFzZCIsImlhdCI6MTcwNTk5NDI3OSwiZXhwIjoxNzA2NTk5MDc5fQ.zi3BZNmSwVd2h8X1Ffo1PC9ktn_p7swkFua2xK91SuI',
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTEwZjg3LWI4ZmYtNGE3Ni05NDBlLWUyY2I5MTQ1MDAzYSIsInBob25lIjoiKzc5NjU5Njg4MjMyIiwiaGFzaCI6ImFzZGFzZGFzZCIsImlhdCI6MTcwNTk5NDI3OSwiZXhwIjoxNzA4NTg2Mjc5fQ.1IlX5IcRHrEpRLEnYxVWrCGMIqMOQRZGG0McPutNfAQ'
        }
      }
}

module.exports = { registerWithoutDescript };