const Disease = require("../models/Entity/Disease.model");

exports.getAllDiseases = async function () {
  try {
    console.log("test 1")
    
    const diseases = await Disease.findAll();
    console.log("test 2")
    if (!diseases || diseases.length === 0) {
      return "No disease found";
    }
    return diseases.map((disease) => disease.get({ plain: true }));
  } catch (error) {
    console.error("Error fetching disease: ", error.message);
    throw error;
  }
};

exports.addNewDisease = async function (params, body) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const {
      name,
    } = body;

    if (!name) throw new Error("Name is required.");

    const newDisease = await Disease.create({
      name: name
    });
    return newDisease.get({ plain: true });
  } catch (error) {
    console.error("Error creating new disease:", error.message);
    throw error;
  }
};
