const Medication = require("../models/Entity/Medication.model");
const MedicationType = require("../models/Enum/MedicationType.enum");
const medicationEnum = ["VITAMIN", "VACCINE", "MEDICINE"];

exports.getAllMedications = async function () {
  try {
    const medications = await Medication.findAll();
    if (!medications || medications.length === 0) {
      return "No medication found";
    }
    return medications.map((medication) => medication.get({ plain: true }));
  } catch (error) {
    console.error("Error fetching medication: ", error.message);
    throw error;
  }
};

exports.addNewMedication = async function (params, body) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const {
      name,
      medicationType,
    } = body;

    if (!name) throw new Error("Name is required.");
    if (!medicationType || !medicationEnum.includes(medicationType)) {
      throw new Error("MedicationType is enum of VITAMIN, VACCINE, MEDICINE");
    }

    const newMedication = await Medication.create({
      name: name,
      type: medicationType
    });
    return newMedication.get({ plain: true });
  } catch (error) {
    console.error("Error creating new medication:", error.message);
    throw error;
  }
};
