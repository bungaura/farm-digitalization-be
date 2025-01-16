const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const Farm = require("../Entity/Farm.model");
const LivestockType = require("../Entity/LivestockType.model");

const LivestockCustomIds = sequelize.define(
  "LivestockCustomIds",
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
    type_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: LivestockType,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    custom_prefix: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    last_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "LivestockCustomIds",
    timestamps: false,
  }
);

module.exports = LivestockCustomIds;
