const Farm = require("../models/Entity/Farm.model");

exports.addNewFarm = async function(params, body) {
  try {
    const { userId } = params;
    if (!userId || userId === ":userId") {
      throw new Error("User ID is required.");
    }
    const {
      farmName
    } = body;

    
    if (!farmName) throw new Error("Name is required");

    const farmExist = await Farm.findOne(
      { where: {owner_id: userId, name: farmName} }
    )
    if (farmExist) throw new Error("Farm with the same name already exist"); 

    const newFarm = await Farm.create({
      name: farmName,
      owner_id: userId
    });
    return newFarm.get({ plain: true });
  } catch (error) {
    console.error("Error when login:", error.message);
    throw error;
  }
}

exports.getFarmByOwnerId = async function(params) {
  try {
    const { userId } = params;
    if (!userId || userId === ":userId") {
      throw new Error("User ID is required.");
    }

    const farms = await Farm.findAll(
      { where: {owner_id: userId} }
    )
    
    if (!farms || farms.length === 0) {
      throw new Error("No users found");
    }

    return farms.map((farm) => farm.get({ plain: true }));
  } catch  (error) {
    console.error("Error when login:", error.message);
    throw error;
  }
}