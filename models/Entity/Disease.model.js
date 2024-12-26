const { DataTypes } = require("sequelize");
const sequelize = require("../../src/database/database");

const Disease = sequelize.define("Disease", {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = Disease;
