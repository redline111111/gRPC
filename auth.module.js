const bcrypt = require('bcrypt');
const { createUser, findUserByPhone } = require('./user.entity');
const  jwt = require('jsonwebtoken');
require('dotenv').config()

async function signToken(id, phone, hash, secret, expiresIn) {
    return jwt.sign({ id, phone, hash }, secret, { expiresIn });
}

async function registerWithoutDescript(data) {
    const { phone, hash } = data;

    try {
        const isPhoneUsed = await findUserByPhone(phone);
        if (isPhoneUsed) {
            throw new Error('Пользователь с таким номером телефона уже существует');
        }
        const hashedPassword = await bcrypt.hash(hash, 10);
        const newUser = await createUser({ ...data, hash: hashedPassword });

        const token = await signToken(newUser.id, phone, hash, process.env.SECRET_KEY, '7d');
        const refreshToken = await signToken(newUser.id, phone, hash, process.env.REFRESH_SECRET_KEY, '30d');

        return { status: 200, message: {...newUser.toJSON(), token, refreshToken } };
    } catch (error) {
        console.error(error);
    }
}

module.exports = { registerWithoutDescript };