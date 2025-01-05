const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const MedicationType = require("../Enum/MedicationType.enum");

const Medication = sequelize.define("Medication", {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(...Object.values(MedicationType)),
    allowNull: false,
  },
});

module.exports = Medication;
