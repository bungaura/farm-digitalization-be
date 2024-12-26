const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

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
    type: DataTypes.ENUM("VITAMIN", "VACCINE", "MEDICINE"),
    allowNull: false,
  },
});

module.exports = Medication;
