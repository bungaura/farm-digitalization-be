const User = require("../models/Entity/User.model");
const UserRole = require("../models/Enum/UserRole.enum")

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

exports.login = async function (body) {
  try {
    const {
      email, 
      password
    } = body;

    const users = await User.findOne(
      { where: { email: email, pass: password } }
    )
    if (users) {
      return { message: "Login success"};
    } else {
      return { message: "Credential not found!"};
    }
  } catch (error) {
    console.error("Error when login:", error.message);
    throw error;
  }
};

exports.register = async function (body) {
  try {
    const {
      name, 
      email, 
      password, 
      role, 
    } = body;

    
    if (!name) throw new Error("Name is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    if (!role) { 
      throw new Error("Role is required"); 
    } 

    const roleType = role.toUpperCase();
    if (!Object.values(UserRole).includes(roleType)) {
      throw new Error("Role must be OWNER or OPERATOR")
    }

    const newUser = await User.create({
      name: name, 
      email: email, 
      pass: password, 
      role: roleType
    });
    return newUser.get({ plain: true });
  } catch (error) {
    console.error("Error when login:", error.message);
    throw error;
  }
};
