const Livestock = require("../models/Entity/Livestock.model");

exports.getAllLivestocks = async function () {
  try {
    const livestocks = await Livestock.findAll();
    if (!livestocks || livestocks.length === 0) {
      return "No livestocks found";
    }
    return users.map((livestock) => livestock.get({ plain: true }));
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};
