const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Livestock = require("./Livestock");

const MilkProduction = sequelize.define("MilkProduction", {
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
});

MilkProduction.belongsTo(Livestock, {
  foreignKey: "livestock_id",
  onDelete: "CASCADE",
});

module.exports = MilkProduction;
