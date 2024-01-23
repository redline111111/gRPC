const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize/sequelize.js');
module.exports = { Encrypt };
const Encrypt = sequelize.define(
  'encrypt',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    key: {
      type: DataTypes.BLOB,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    timestamps: false,
  }
);
