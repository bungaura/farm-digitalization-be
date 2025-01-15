const LivestockCustomIds = require("../models/Entity/LivestockCustomIds.model");
const LivestockType = require("../models/Entity/LivestockType.model");

exports.setCustomId = async function (params, body) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const { typeId, prefix } = body;
    if (!typeId) throw new Error("Type ID is required.");

    const livestockType = await LivestockType.findByPk(typeId);
    if (!livestockType) throw new Error("Livestock type not found.");

    const existingCustomId = await LivestockCustomIds.findOne({
      where: { farm_id: farmId, type_id: typeId },
    });

    if (existingCustomId) {
      existingCustomId.custom_prefix = prefix;
      await existingCustomId.save();
      return { message: "Custom ID updated successfully.", prefix };
    } else {
      const newCustomId = await LivestockCustomIds.create({
        farm_id: farmId,
        type_id: typeId,
        custom_prefix: prefix,
      });
      return { message: "Custom ID created successfully.", newCustomId };
    }
  } catch (error) {
    throw error;
  }
};
