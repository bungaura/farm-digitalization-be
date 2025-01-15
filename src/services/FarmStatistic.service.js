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

      monthlyMilkProduction[month] += quantity;
    });
    
    return monthlyMilkProduction.map((total, index) => ({month: index + 1, total_quantity: total}));    

  } catch (error) {
    console.error("Error getting number of livestock:", error.message);
    throw error;
  }
};

exports.getLivestockSoldCountByFarmId = async function (path, query) {
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

    includeOptions = [{
        model: LivestockType,
        where: { type: type.toUpperCase() },
        attributes: []
    }];

    const livestockSoldData = await Livestock.findAll({
      where: {
        status: "TERJUAL",
        updatedAt: sequelize.where(sequelize.fn('YEAR', sequelize.col('updatedAt')), year),
      },
      include: includeOptions,
      attributes: ["id", "updatedAt", "status"],
    });
    
    const monthlyLivestockSold = new Array(12).fill(0);
    livestockSoldData.forEach((record) => {
      const month = new Date(record.updatedAt).getMonth();
      monthlyLivestockSold[month] += 1;
    });
    
    return monthlyLivestockSold.map((total, index) => ({month: index + 1, total_quantity: total}));    

  } catch (error) {
    console.error("Error getting number of livestock:", error.message);
    throw error;
  }
};

exports.getAverageMilkProductionByYear = async function (path, query) {
  try {
    const { year } = path;
    const { type } = query;

    if (!year || year === ":year") {
      throw new Error("Year is required.");
    }

    if (!type) {
      throw new Error("Livestock Type is required.");
    }

    includeOptions = [
      {
        model: Livestock,
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

    const milkProductionSummary = {};
    milkProductionData.forEach((record) => {
      const year = new Date(record.dateOfProduction).getFullYear();
      const quantity = parseFloat(record.quantity);
      
      if (!milkProductionSummary[year]) {
        milkProductionSummary[year] = { totalQuantity: 0, count: 0 };
      }
    
      milkProductionSummary[year].totalQuantity += quantity;
      milkProductionSummary[year].count += 1;
    });
    
    const averageMilkProductionPerYear = {};
    for (const year in milkProductionSummary) {
      const { totalQuantity, count } = milkProductionSummary[year];
      averageMilkProductionPerYear[year] = totalQuantity / count;
    }
    
    return averageMilkProductionPerYear;

  } catch (error) {
    console.error("Error getting number of livestock:", error.message);
    throw error;
  }
};
