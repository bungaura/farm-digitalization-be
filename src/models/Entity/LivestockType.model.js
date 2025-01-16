const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const Livestock = require("../Entity/Livestock.model");

const LivestockType = sequelize.define("LivestockType", {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  type: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

module.exports = LivestockType;
