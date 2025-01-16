const LivestockCustomIds = require("../models/Entity/LivestockCustomIds.model");
const LivestockType = require("../models/Entity/LivestockType.model");
const LivestockCustomDurationPhase = require("../models/Entity/LivestockCustomDurationPhase.model");

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

exports.setDurationPhase = async function (params, body) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const { 
      cempe_phase_in_month, 
      dara_phase_in_month, 
      siap_kawin_phase_in_month,
      hamil_phase_in_month, 
      menyusui_phase_in_month} 
    = body;

    // const farm = await Farm.findByPk(farmId);
    // farm.

    const existingDurationPhase = await LivestockCustomDurationPhase.findOne({
      where: { farm_id: farmId},
    });

    if (existingDurationPhase) {
      await existingDurationPhase.update(body)
      return { message: "Duration Phase updated successfully.",  };
    } else {
      const newDurationPhase = await LivestockCustomDurationPhase.create({
        farm_id: farmId,
        cempe_phase_in_month: cempe_phase_in_month,
        dara_phase_in_month: dara_phase_in_month,
        siap_kawin_phase_in_month: siap_kawin_phase_in_month, 
        hamil_phase_in_month: hamil_phase_in_month, 
        menyusui_phase_in_month: menyusui_phase_in_month
      });
      return { message: "Duration Phase created successfully.", newDurationPhase };
    }
  } catch (error) {
    throw error;
  }
}
