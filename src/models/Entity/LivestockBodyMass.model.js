const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");

const LivestockBodyMass = sequelize.define("LivestockBodyMass", {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  livestock_id: {},
  dateOfProduction: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  mass: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
});

Breed.belongsTo(LivestockType, { foreignKey: "type_id", onDelete: "CASCADE" });

module.exports = LivestockBodyMass;
