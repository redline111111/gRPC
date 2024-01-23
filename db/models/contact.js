const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize/sequelize.js');

module.exports = { Contact };
const Contact = sequelize.define("contact", {
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  contact_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,

    defaultValue: 0,
  },
  user_alias: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  timestamps: false
});