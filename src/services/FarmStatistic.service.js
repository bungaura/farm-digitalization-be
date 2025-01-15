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
    return { count: cowsCount };

  } catch (error) {
    console.error("Error getting number of cows:", error.message);
    throw error;
  }
};

// exports.getFemaleCowsCountByFarmId = async function (params) {
//   try {
//     const { farmId } = params;
//     if (!farmId || farmId === ":farmId") {
//       throw new Error("Farm ID is required.");
//     }

//     const cowsCount = await Livestock.count({
//       where: {
//         farm_id: farmId,
//         type_id: "COW",
//         gender: "FEMALE"
//       }
//     });
//     return { count: cowsCount };

//   } catch (error) {
//     console.error("Error getting number of female cows:", error.message);
//     throw error;
//   }
// };

// exports.getMaleCowsCountByFarmId = async function (params) {
//   try {
//     const { farmId } = params;
//     if (!farmId || farmId === ":farmId") {
//       throw new Error("Farm ID is required.");
//     }

//     const cowsCount = await Livestock.count({
//       where: {
//         farm_id: farmId,
//         type_id: "COW",
//         gender: "MALE"
//       }
//     });
//     return { count: cowsCount };

//   } catch (error) {
//     console.error("Error getting number of male cows:", error.message);
//     throw error;
//   }
// };

// exports.getGoatsCountByFarmId = async function (params) {
//   try {
//     const { farmId } = params;
//     if (!farmId || farmId === ":farmId") {
//       throw new Error("Farm ID is required.");
//     }

//     const goatsCount = await Livestock.count({
//       where: {
//         farm_id: farmId,
//         type_id: "GOAT"
//       }
//     });
//     return { count: goatsCount };

//   } catch (error) {
//     console.error("Error getting number of goats:", error.message);
//     throw error;
//   }
// };

// exports.getFemaleGoatsCountByFarmId = async function (params) {
//   try {
//     const { farmId } = params;
//     if (!farmId || farmId === ":farmId") {
//       throw new Error("Farm ID is required.");
//     }

//     const goatsCount = await Livestock.count({
//       where: {
//         farm_id: farmId,
//         type_id: "GOAT",
//         gender: "FEMALE"
//       }
//     });
//     return { count: goatsCount };

//   } catch (error) {
//     console.error("Error getting number of female goats:", error.message);
//     throw error;
//   }
// };

// exports.getMaleGoatsCountByFarmId = async function (params) {
//   try {
//     const { farmId } = params;
//     if (!farmId || farmId === ":farmId") {
//       throw new Error("Farm ID is required.");
//     }

//     const goatsCount = await Livestock.count({
//       where: {
//         farm_id: farmId,
//         type_id: "GOAT",
//         gender: "MALE"
//       }
//     });
//     return { count: goatsCount };

//   } catch (error) {
//     console.error("Error getting number of male goats:", error.message);
//     throw error;
//   }
// };

// exports.getSheepCountByFarmId = async function (params) {
//   try {
//     const { farmId } = params;
//     if (!farmId || farmId === ":farmId") {
//       throw new Error("Farm ID is required.");
//     }

//     const sheepCount = await Livestock.count({
//       where: {
//         farm_id: farmId,
//         type_id: "SHEEP"
//       }
//     });
//     return { count: sheepCount };

//   } catch (error) {
//     console.error("Error getting number of sheep:", error.message);
//     throw error;
//   }
// };

// exports.getFemaleSheepCountByFarmId = async function (params) {
//   try {
//     const { farmId } = params;
//     if (!farmId || farmId === ":farmId") {
//       throw new Error("Farm ID is required.");
//     }

//     const sheepCount = await Livestock.count({
//       where: {
//         farm_id: farmId,
//         type_id: "SHEEP",
//         gender: "FEMALE"
//       }
//     });
//     return { count: sheepCount };

//   } catch (error) {
//     console.error("Error getting number of female sheep:", error.message);
//     throw error;
//   }
// };

// exports.getMaleSheepCountByFarmId = async function (params) {
//   try {
//     const { farmId } = params;
//     if (!farmId || farmId === ":farmId") {
//       throw new Error("Farm ID is required.");
//     }

//     const sheepCount = await Livestock.count({
//       where: {
//         farm_id: farmId,
//         type_id: "SHEEP",
//         gender: "MALE"
//       }
//     });
//     return { count: sheepCount };

//   } catch (error) {
//     console.error("Error getting number of male sheep:", error.message);
//     throw error;
//   }
// };

exports.getLivestockCountByFarmId = async function (farmId, filters) {
  try {
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const count = await Livestock.count({where: filters});
    return { count: count };

  } catch (error) {
    console.error("Error getting number of livestock:", error.message);
    throw error;
  }
};