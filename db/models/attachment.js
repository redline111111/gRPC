const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize/sequelize.js');

module.exports = { Attachment };
const Attachment = sequelize.define(
  'attachment',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,

      defaultValue: DataTypes.UUIDV4,
    },
    message_id: {
      type: DataTypes.INTEGER,
    },

    user_id: {
      type: DataTypes.UUID,
    },

    file_id: {
      type: DataTypes.UUID,
    },
    originalFilePath: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    encupsFile: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
