const Lactation = require("../models/Entity/Lactation.model");
const sequelize = require("../database/database.js");
const Livestock = require("../models/Entity/Livestock.model");
const LivestockType = require("../models/Entity/LivestockType.model");
const MilkProduction = require("../models/Entity/MilkProduction.model");

exports.getLivestockCountByFarmId = async function (path, query) {
  try {
    const { farmId } = path;
    const { type, gender, condition, phase, status } = query;

    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }
    const filters = {}
    if (gender) filters.gender = gender.toUpperCase();
    if (condition) filters.condition = condition;
    if (phase) filters.phase = phase.toUpperCase();
    if (status) filters.status = status;

    includeOptions = []
    if (type) {
      includeOptions.push({
        model: LivestockType,
        where: { type: type.toUpperCase() }, 
        attributes: [],
      });
    }

    const count = await Livestock.count({
      where: filters,
      include: includeOptions
    });
    
    return { count: count };

  } catch (error) {
    console.error("Error getting number of livestock:", error.message);
    throw error;
  }
};

exports.getMilkProductionByFarmId = async function (path, query) {
  try {
    const { farmId } = path;
    const { type, year } = query;

    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    if (!type) {
      throw new Error("Livestock Type is required.");
    }

    if (!year) {
      throw new Error("Year is required.");
    }

    includeOptions = [
      {
        model: Livestock,
        where: { farm_id: farmId },
        include: [
          {
            model: LivestockType,
            where: { type: type.toUpperCase() },
            attributes: []
          }
        ],
        attributes: []
      }
    ];

    const milkProductionData = await MilkProduction.findAll({
      where: {
        dateOfProduction: sequelize.where(sequelize.fn('YEAR', sequelize.col('dateOfProduction')), year)
      },
      include: includeOptions,
      attributes: ["id", "dateOfProduction", "quantity"],
    });
    
    const monthlyMilkProduction = new Array(12).fill(0);
    milkProductionData.forEach((record) => {
      const month = new Date(record.dateOfProduction).getMonth();
      const quantity = parseFloat(record.quantity);

      if (!monthlyMilkProduction[month]) {
        monthlyMilkProduction[month] = 0;
      }
      monthlyMilkProduction[month] += quantity;
    });
    
    return monthlyMilkProduction.map((total, index) => ({month: index + 1, total_quantity: total}));    

  } catch (error) {
    console.error("Error getting number of livestock:", error.message);
    throw error;
  }
};