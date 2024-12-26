const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const User = require("./User.model");
const Farm = require("./Farm.model");

const UserFarm = sequelize.define("UserFarm", {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  role: {
    type: DataTypes.ENUM("OWNER", "OPERATOR"),
    allowNull: false,
  },
});

UserFarm.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
UserFarm.belongsTo(Farm, { foreignKey: "farm_id", onDelete: "CASCADE" });

module.exports = UserFarm;
