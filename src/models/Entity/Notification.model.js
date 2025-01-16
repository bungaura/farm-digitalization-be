const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const User = require("..//Entity/User.model");
const Farm = require("../Entity/Farm.model");

const Notifications = sequelize.define(
  "Notifications",
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
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    read_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "Notifications",
    timestamps: true,
  }
);

Notifications.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
Notifications.belongsTo(Farm, { foreignKey: "farm_id", onDelete: "CASCADE" });

module.exports = Notifications;
