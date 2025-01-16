const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const Farm = require("../Entity/Farm.model");
const LivestockPhase = require("../Enum/LivestockPhase.enum");

const PhasesConfiguration = sequelize.define("PhasesConfiguration", {
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
  phase_name: {
    type: DataTypes.ENUM(...Object.values(LivestockPhase)),
    allowNull: false,
  },
  duration_months: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

PhasesConfiguration.belongsTo(Farm, {
  foreignKey: "farm_id",
  onDelete: "CASCADE",
});

module.exports = PhasesConfiguration;
