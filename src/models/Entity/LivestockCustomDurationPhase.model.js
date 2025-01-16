const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const Farm = require("./Farm.model");

const LivestockCustomDurationPhase = sequelize.define(
  "LivestockCustomDurationPhase",
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
    cempe_phase_in_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    dara_phase_in_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 12,
    },
    siap_kawin_phase_in_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 12,
    },
    hamil_phase_in_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    menyusui_phase_in_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 6,
    },
  },
  {
    tableName: "LivestockCustomDurationPhase",
    timestamps: false,
  }
);

module.exports = LivestockCustomDurationPhase;
