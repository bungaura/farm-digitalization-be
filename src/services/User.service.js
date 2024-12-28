const User = require("../models/Entity/User.model");

exports.getAllUsers = async function () {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["pass"] }, // Exclude the password field
    });
    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    return users.map((user) => user.get({ plain: true }));
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};
