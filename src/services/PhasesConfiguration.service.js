const PhasesConfiguration = require("../models/Entity/PhasesConfiguration.model");
const Farm = require("../models/Entity/Farm.model");
const LivestockPhase = require("../models/Enum/LivestockPhase.enum");

// CREATE TABLE PhasesConfiguration (
//     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
//     farm_id CHAR(36) NOT NULL,
//     phase_name ENUM('CEMPE', 'DARA', 'SIAPKAWIN', 'HAMIL', 'BREASTFEEDING') NOT NULL,
//     duration_months INT NOT NULL,
//     FOREIGN KEY (farm_id) REFERENCES Farms(id) ON DELETE CASCADE
// );

exports.addPhasesConfiguration = async function (params, body) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const farm = await Farm.findByPk(farmId);
    if (!farm) throw new Error("No farm found with the given ID.");

    const validPhases = Object.values(LivestockPhase);
    const inputPhases = body.map(({ phaseName }) => phaseName);

    const missingPhases = validPhases.filter(
      (phase) => !inputPhases.includes(phase)
    );
    const duplicatePhases = inputPhases.filter(
      (phase, index, arr) => arr.indexOf(phase) !== index
    );

    if (missingPhases.length > 0) {
      throw new Error(`Missing phases: ${missingPhases.join(", ")}.`);
    }
    if (duplicatePhases.length > 0) {
      throw new Error(`Duplicate phases found: ${duplicatePhases.join(", ")}.`);
    }

    body.forEach(({ phaseName, durationMonths }) => {
      if (!phaseName || !validPhases.includes(phaseName)) {
        throw new Error(
          `Invalid phase name: '${phaseName}'. Valid phases are: ${validPhases.join(
            ", "
          )}`
        );
      }
      if (
        !durationMonths ||
        typeof durationMonths !== "number" ||
        durationMonths <= 0
      ) {
        throw new Error(
          `Invalid duration for phase '${phaseName}'. Duration must be a positive number.`
        );
      }
    });

    const newPhasesConfig = await PhasesConfiguration.bulkCreate(
      body.map(({ phaseName, durationMonths }) => ({
        farm_id: farmId,
        phase_name: phaseName,
        duration_months: durationMonths,
      }))
    );

    return newPhasesConfig.map((phase) => phase.get({ plain: true }));

    // const { phaseName, durationMonths } = body;

    // if (!phaseName) throw new Error("Phase name is required.");
    // // const validPhases = Object.values(LivestockPhase);
    // if (!validPhases.includes(phaseName)) {
    //   throw new Error(
    //     `Invalid phase name '${phaseName}'. Valid phases are: ${validPhases.join(
    //       ", "
    //     )}`
    //   );
    // }

    // if (!durationMonths) {
    //   throw new Error("Duration months is required.");
    // } else if (typeof durationMonths !== "number" || durationMonths <= 0) {
    //   throw new Error("Valid duration (in months) is required.");
    // }

    // const newPhaseConfig = await PhasesConfiguration.create({
    //   farm_id: farmId,
    //   phase_name: phaseName,
    //   duration_months: durationMonths,
    // });
  } catch (error) {
    console.error("Error adding phases configuration:", error.message);
    throw error;
  }
};

exports.changePhaseConfiguration = async function (params, body) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const farm = await Farm.findByPk(farmId);
    if (!farm) throw new Error("No farm found with the given ID.");
  } catch (error) {
    console.error("Error changing phase configuration:", error.message);
    throw error;
  }
};

exports.getPhasesConfiguration = async function (params) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }
  } catch (error) {
    console.error("Error getting phases configuration:", error.message);
    throw error;
  }
};
