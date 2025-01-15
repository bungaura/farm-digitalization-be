const { DataTypes } = require("sequelize");
const database = require("../../database/database");
const Livestock = require("../Entity/Livestock.model");
const sequelize = require("../../database/database");


const Lactation = sequelize.define("Lactation", {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  lactation_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  offspring_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  male_offspring_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  female_offspring_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  colostrum_quantity: {
    type: DataTypes.DECIMAL(10, 2),
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Lactation.belongsTo(Livestock, {
  foreignKey: "livestock_id",
  onDelete: "CASCADE",
});

module.exports = Lactation;
