const User = require("../models/Entity/User.model");

exports.getAllUsers = async function () {
  try {
    const users = await User.findAll(); // Fetch all users
    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    return users.map((user) => user.get({ plain: true })); // Return plain JSON
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error; // Propagate the error
  }
};
