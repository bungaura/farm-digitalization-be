const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database.js");
const Livestock = require("../Entity/Livestock.model");

const MilkProduction = sequelize.define(
  "MilkProduction",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    dateOfProduction: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "MilkProduction",
    timestamps: false,
  }
);

MilkProduction.belongsTo(Livestock, {
  foreignKey: "livestock_id",
  onDelete: "CASCADE",
});

module.exports = MilkProduction;
