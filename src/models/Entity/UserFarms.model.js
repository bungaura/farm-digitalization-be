const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const User = require("../Entity/User.model");
const Farm = require("../Entity/Farm.model");

const UserFarm = sequelize.define(
  "UserFarm",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    farm_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: Farm,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    role: {
      type: DataTypes.ENUM("OWNER", "OPERATOR"),
      allowNull: false,
    },
  },
  {
    tableName: "UserFarms",
    timestamps: false,
  }
);

// Define associations
UserFarm.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
UserFarm.belongsTo(Farm, { foreignKey: "farm_id", onDelete: "CASCADE" });

module.exports = UserFarm;
