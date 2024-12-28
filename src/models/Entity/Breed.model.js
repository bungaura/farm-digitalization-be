const { DataTypes } = require("sequelize");
const sequelize = require("../../database/database");
const LivestockType = require("./LivestockType.model");

const Breed = sequelize.define("Breed", {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
});

Breed.belongsTo(LivestockType, { foreignKey: "type_id", onDelete: "CASCADE" });

module.exports = Breed;
