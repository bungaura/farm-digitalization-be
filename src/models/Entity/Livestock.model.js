const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const Farm = require("../Entity/Farm.model");
const Breed = require("../Entity/Breed.model");
const LivestockGender = require("../Enum/LivestockGender.enum");
const LivestockPhase = require("../Enum/LivestockPhase.enum");
const LivestockType = require("../Entity/LivestockType.model");
const LivestockCondition = require("../Enum/LivestockCondition.enum");
const LivestockStatus = require("../Enum/LivestockStatus.enum");

const Livestock = sequelize.define(
  "Livestock",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM(...Object.values(LivestockGender)),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
    },
    phase: {
      type: DataTypes.ENUM(...Object.values(LivestockPhase)),
    },
    photo_url: {
      type: DataTypes.STRING(255),
    },
    grade: {
      type: DataTypes.STRING(50),
    },
    breed_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    type_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    livestock_condition: {
      type: DataTypes.ENUM(...Object.values(LivestockCondition)),
    },
    status: {
      type: DataTypes.ENUM(...Object.values(LivestockStatus)),
    },
  },
  {
    tableName: "Livestock",
    timestamps: true,
  }
);
Livestock.belongsTo(Farm, { foreignKey: "farm_id", onDelete: "CASCADE" });
Livestock.belongsTo(Breed, {
  foreignKey: "breed_id",
  onDelete: "SET NULL",
  as: "BreedAlias", // Alias yang sesuai
});

Livestock.belongsTo(LivestockType, {
  foreignKey: "type_id",
  onDelete: "CASCADE",
});

module.exports = Livestock;
