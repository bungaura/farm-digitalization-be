const Lactation = require("../models/Entity/Lactation.model");
const Livestock = require("../models/Entity/Livestock.model");

exports.getLactationDataByLivestockId = async function (params) {
  try {
    const { livestockId } = params;

    if (!livestockId || livestockId === ":livestockId") {
      throw new Error("Livestock ID is required.");
    }

    const lactationData = await Lactation.findAll({
      where: { livestock_id: livestockId },
      order: [["lactation_number", "DESC"]], // Sort by lactation number descending
      attributes: [
        "id",
        "lactation_number",
        "dob",
        "total_child",
        "total_male_child",
        "total_female_child",
      ],
    });

    if (!lactationData.length) {
      return { success: true, message: "No lactation data found." };
    }

    return {
      success: true,
      data: lactationData,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

exports.addSpouse = async function (params, body) {
  try {
    const { livestockId } = params;
    if (!livestockId || livestockId === ":livestockId") {
      throw new Error("Livestock ID is required.");
    }

    const { spouseId } = body;
    if (!spouseId) throw new Error("Spouse ID is required for HAMIL phase.");

    const livestock = await Livestock.findByPk(livestockId);
    if (!livestock) throw new Error("Livestock not found.");

    const spouse = await Livestock.findByPk(spouseId);
    if (!spouse) throw new Error("Spouse livestock not found.");
    if (spouse.gender !== "MALE")
      throw new Error("Spouse must be a male livestock.");
    if (spouse.farm_id !== livestock.farm_id)
      throw new Error("Spouse must belong to the same farm.");

    // Get the current highest lactation number for this livestock
    const latestLactation = await Lactation.findOne({
      where: { livestock_id: livestockId },
      order: [["lactation_number", "DESC"]],
    });

    const nextLactationNum = latestLactation
      ? latestLactation.lactation_number + 1
      : 1;

    // Create a new lactation entry
    const addedLactation = await Lactation.create({
      livestock_id: livestockId,
      spouse_id: spouseId,
      lactation_number: nextLactationNum,
    });

    return { message: "Spouse added successfully.", addedLactation };
  } catch (error) {
    throw error;
  }
};

exports.updateLactation = async function (params, body) {
  try {
    const { livestockId } = params;
    const { dob, totalChild, totalMaleChild, totalFemaleChild } = body;

    if (!livestockId || livestockId === ":livestockId") {
      throw new Error("Livestock ID is required.");
    }

    // Find the livestock and validate it's female
    const livestock = await Livestock.findByPk(livestockId);
    if (!livestock) throw new Error("Livestock not found.");
    if (livestock.gender !== "FEMALE") {
      throw new Error("Only female livestock can have lactation.");
    }

    // Find the latest lactation entry for this livestock
    const latestLactation = await Lactation.findOne({
      where: { livestock_id: livestockId },
      order: [["lactation_number", "DESC"]],
    });

    if (!latestLactation) {
      throw new Error(
        "No lactation record found. Please add a spouse first before updating lactation."
      );
    }

    // Update the existing lactation record with the provided data
    latestLactation.dob = dob;
    latestLactation.total_child = totalChild || 0;
    latestLactation.total_male_child = totalMaleChild || 0;
    latestLactation.total_female_child = totalFemaleChild || 0;

    await latestLactation.save();

    return {
      message: "Lactation updated successfully.",
      lactation: latestLactation,
    };
  } catch (error) {
    throw error;
  }
};

exports.getSpouseNameId = async function (params) {
  try {
    const { livestockId } = params;
    if (!livestockId || livestockId === ":livestockId") {
      throw new Error("Livestock ID is required.");
    }

    const latestLactation = await Lactation.findOne({
      where: { livestock_id: livestockId },
      order: [["lactation_number", "DESC"]],
      include: [
        { model: Livestock, as: "Spouse", attributes: ["id", "name_id"] },
      ],
    });

    if (!latestLactation) {
      throw new Error("No lactation data found for this livestock.");
    }

    return {
      success: true,
      data: {
        spouseId: latestLactation.Spouse.id,
        nameId: latestLactation.Spouse.name_id,
      },
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
