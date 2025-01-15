const Lactation = require("../models/Entity/Lactation.model");
const Livestock = require("../models/Entity/Livestock.model");
const Farm = require("../models/Entity/Farm.model");

exports.getCowsCountByFarmId = async function (params) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }
    
    const cowsCount = await Livestock.count({
        where: {
            farm_id: farmId,
            type_id: "COW"
        }
    });
    return { success: true, count: cowsCount };

  } catch (error) {
    console.error("Error getting number of cows:", error.message);
    throw error;
  }
};

exports.getFemaleCowsCountByFarmId = async function (params) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const cowsCount = await Livestock.count({
      where: {
        farm_id: farmId,
        type_id: "COW",
        gender: "FEMALE"
      }
    });
    return { success: true, count: cowsCount };

  } catch (error) {
    console.error("Error getting number of female cows:", error.message);
    throw error;
  }
};

exports.getMaleCowsCountByFarmId = async function (params) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const cowsCount = await Livestock.count({
      where: {
        farm_id: farmId,
        type_id: "COW",
        gender: "MALE"
      }
    });
    return { success: true, count: cowsCount };

  } catch (error) {
    console.error("Error getting number of male cows:", error.message);
    throw error;
  }
};

exports.getGoatsCountByFarmId = async function (params) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const goatsCount = await Livestock.count({
      where: {
        farm_id: farmId,
        type_id: "GOAT"
      }
    });
    return { success: true, count: goatsCount };

  } catch (error) {
    console.error("Error getting number of goats:", error.message);
    throw error;
  }
};

exports.getFemaleGoatsCountByFarmId = async function (params) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const goatsCount = await Livestock.count({
      where: {
        farm_id: farmId,
        type_id: "GOAT",
        gender: "FEMALE"
      }
    });
    return { success: true, count: goatsCount };

  } catch (error) {
    console.error("Error getting number of female goats:", error.message);
    throw error;
  }
};

exports.getMaleGoatsCountByFarmId = async function (params) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const goatsCount = await Livestock.count({
      where: {
        farm_id: farmId,
        type_id: "GOAT",
        gender: "MALE"
      }
    });
    return { success: true, count: goatsCount };

  } catch (error) {
    console.error("Error getting number of male goats:", error.message);
    throw error;
  }
};

exports.getSheepCountByFarmId = async function (params) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const sheepCount = await Livestock.count({
      where: {
        farm_id: farmId,
        type_id: "SHEEP"
      }
    });
    return { success: true, count: sheepCount };

  } catch (error) {
    console.error("Error getting number of sheep:", error.message);
    throw error;
  }
};

exports.getFemaleSheepCountByFarmId = async function (params) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const sheepCount = await Livestock.count({
      where: {
        farm_id: farmId,
        type_id: "SHEEP",
        gender: "FEMALE"
      }
    });
    return { success: true, count: sheepCount };

  } catch (error) {
    console.error("Error getting number of female sheep:", error.message);
    throw error;
  }
};

exports.getMaleSheepCountByFarmId = async function (params) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const sheepCount = await Livestock.count({
      where: {
        farm_id: farmId,
        type_id: "SHEEP",
        gender: "MALE"
      }
    });
    return { success: true, count: sheepCount };

  } catch (error) {
    console.error("Error getting number of male sheep:", error.message);
    throw error;
  }
};
