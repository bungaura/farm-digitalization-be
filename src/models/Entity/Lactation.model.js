const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const Livestock = require("../Entity/Livestock.model");

const Lactation = sequelize.define(
  "Lactation",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    livestock_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: Livestock,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    spouse_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: Livestock,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    lactation_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
    },
    total_child: {
      type: DataTypes.INTEGER,
    },
    total_male_child: {
      type: DataTypes.INTEGER,
    },
    total_female_child: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Lactation",
    timestamps: true,
  }
);

// Relasi ke Livestock sebagai induk (livestock_id)
Lactation.belongsTo(Livestock, {
  foreignKey: "livestock_id",
  onDelete: "CASCADE",
  as: "Livestock",
});

// Relasi ke Livestock sebagai pasangan (spouse_id)
Lactation.belongsTo(Livestock, {
  foreignKey: "spouse_id",
  onDelete: "CASCADE",
  as: "Spouse",
});

module.exports = Lactation;
