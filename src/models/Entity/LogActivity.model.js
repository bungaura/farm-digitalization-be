const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const Farm = require("../Entity/Farm.model");
const User = require("../Entity/User.model");

const LogActivity = sequelize.define(
  "LogActivity",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    action: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
  },
  {
    tableName: "LogActivity",
    timestamps: true,
  }
);

LogActivity.belongsTo(User, {
  foreignKey: "user_id",
  as: "User",
});

module.exports = LogActivity;
