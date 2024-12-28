const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const User = require("./User.model");

const Farm = sequelize.define("Farm", {
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

Farm.belongsTo(User, {
  as: "owner",
  foreignKey: "owner_id",
  onDelete: "CASCADE",
});

module.exports = Farm;
