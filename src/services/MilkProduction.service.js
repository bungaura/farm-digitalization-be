const MilkProduction = require("../models/Entity/MilkProduction.model");
const Livestock = require("../models/Entity/Livestock.model");

exports.addNewMilkProduction = async function (params, body) {
  try {
    const { livestockId } = params;
    if (!livestockId || livestockId === ":livestockId") {
      throw new Error("Livestock ID is required.");
    }

    const livestock = await Livestock.findByPk(livestockId);
    if (!livestock) throw new Error("No livestock found with the given ID.");

    if (livestock.gender !== "FEMALE") {
      throw new Error(
        "Milk production can only be recorded for female livestock."
      );
    }

    const { dateOfProduction, quantity } = body;

    if (!dateOfProduction)
      //todo:check if format is right (other than date format is prohibited)
      throw new Error("Date of milk production is required.");
    if (!quantity) throw new Error("Quantity (in liters) is required.");

    const newMilkProduction = await MilkProduction.create({
      livestock_id: livestockId,
      dateOfProduction: dateOfProduction,
      quantity: quantity,
    });

    return newMilkProduction.get({ plain: true });
  } catch (error) {
    console.error("Error adding new milk production:", error.message);
    throw error;
  }
};

exports.getMilkProduction = async function (params) {
  try {
    const { livestockId } = params;
    if (!livestockId || livestockId === ":livestockId") {
      throw new Error("Livestock ID is required.");
    }

    const livestocks = await Livestock.findByPk(livestockId);
    if (!livestocks) throw new Error("No livestock found with the given ID");

    const milkProductionData = await MilkProduction.findAll({
      where: { livestock_id: livestockId },
      order: [["dateOfProduction", "ASC"]], // order by production date
      attributes: ["id", "livestock_id", "dateOfProduction", "quantity"],
    });

    if (!milkProductionData || milkProductionData.length === 0) {
      return "No milk production data found";
    }
    return milkProductionData.map((data) => data.get({ plain: true }));
  } catch (error) {
    console.error("Error getting milk production:", error.message);
    throw error;
  }
};
