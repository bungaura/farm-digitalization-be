const LogActivity = require("../models/Entity/LogActivity.model");
const Livestock = require("../models/Entity/Livestock.model");
const Farm = require("../models/Entity/Farm.model");
const User = require("../models/Entity/User.model");
const LivestockType = require("../models/Entity/LivestockType.model");

exports.addNewLogActivity = async function (params, body) {
  try {
    const { farmId, userId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm Id is required.");
    }
    if (!userId || userId === ":userId") {
      throw new Error("Farm Id is required.");
    }

    const farm = await Farm.findByPk(farmId);
    if (!farm) throw new Error("Farm not found.");

    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found.");

    const { action, details } = body;
    if (!action) throw new Error("Action is required.");
    if (!details) throw new Error("Details are required.");

    const livestock = await Livestock.findByPk(details.livestockId, {
      include: [
        {
          model: LivestockType,
          attributes: ["type"],
        },
      ],
    });
    console.log("Livestock with Type:", JSON.stringify(livestock, null, 2));

    if (!livestock) throw new Error("Livestock not found.");

    const type = livestock.LivestockType?.type;
    if (!type) throw new Error("Livestock type not found.");

    switch (type) {
      case "GOAT":
        details.type = "Kambing";
        break;
      case "COW":
        details.type = "Sapi";
        break;
      case "SHEEP":
        details.type = "Domba";
        break;
      default:
        throw new Error("Unknown livestock type.");
    }
    details.nameId = livestock.name_id;

    details.newPhase = livestock.phase;

    const description = generateDescription(action, details);

    const newLog = await LogActivity.create({
      farm_id: farmId,
      action,
      description,
      user_id: userId,
      createdAt: livestock.createdAt,
      updatedAt: livestock.updatedAt,
    });

    return { message: "Log activity added successfully.", log: newLog };
  } catch (error) {
    throw error;
  }
};

function generateDescription(action, details) {
  switch (action) {
    case "ADD_LIVESTOCK":
      return `${details.type} ${details.nameId} baru ditambahkan.`;
    case "UPDATE_LIVESTOCK":
      return `Data ${details.type} ${details.nameId} diperbarui.`;
    case "CHANGE_PHASE":
      return `Fase ${details.type} ${details.nameId} diubah dari ${details.oldPhase} ke ${details.newPhase}.`;
    case "ADD_LACTATION":
      return `Laktasi baru untuk ${details.type} ${details.nameId} (ke-${details.lactationNum}) ditambahkan.`;
    case "UPDATE_LACTATION":
      return `Data laktasi ke-${details.lactationNum} untuk ${details.type} ${details.nameId} diperbarui.`;
    case "DELETE_LIVESTOCK":
      return `${details.type} ${details.nameId} dihapus.`;
    case "ADD_MILKPRODUCTION":
      return `Produksi susu ${details.quantity}L untuk ${details.type} ${details.nameId} dicatat.`;
    case "DELETE_MILKPRODUCTION":
      return `Data produksi susu untuk ${details.type} ${details.nameId} dihapus.`;
    case "ADD_BODYMASS":
      return `Berat badan ${details.weight}kg untuk ${details.type} ${details.nameId} ditambahkan.`;
    case "DELETE_BODYMASS":
      return `Data berat badan untuk ${details.type} ${details.nameId} dihapus.`;
    default:
      return "Aksi dilakukan.";
  }
}

exports.getLogActivities = async function (params) {
  try {
    const { farmId } = params;

    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const logs = await LogActivity.findAll({
      where: { farm_id: farmId },
      include: [
        {
          model: User,
          as: "User",
          attributes: ["name"],
        },
      ],
      attributes: ["description", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    const formattedLogs = logs.map((log) => ({
      userName: log.User ? log.User.name : "Unknown User",
      date: log.createdAt,
      description: log.description,
    }));

    return { message: "Log fetched successfully", log: formattedLogs };
  } catch (error) {
    console.error("Error fetching log activities:", error.message);
    throw error;
  }
};
