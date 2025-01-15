const Lactation = require("../models/Entity/Lactation.model");
const Livestock = require("../models/Entity/Livestock.model");
const LivestockType = require("../models/Entity/LivestockType.model");
const Farm = require("../models/Entity/Farm.model");

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