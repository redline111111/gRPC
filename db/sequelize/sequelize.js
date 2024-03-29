const Sequelize = require('sequelize');
require('dotenv').config()

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST );
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
 host: process.env.DB_HOST,
  dialect: 'postgres',
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
  }})

  
module.exports = { sequelize };