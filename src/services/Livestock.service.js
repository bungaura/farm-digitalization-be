const Livestock = require("../models/Entity/Livestock.model");
const Farm = require("../models/Entity/Farm.model");
const Breed = require("../models/Entity/Breed.model");
const LivestockType = require("../models/Entity/LivestockType.model");

exports.getAllLivestocks = async function () {
  try {
    const livestocks = await Livestock.findAll();
    if (!livestocks || livestocks.length === 0) {
      return "No livestocks found";
    }
    return livestocks.map((livestock) => livestock.get({ plain: true }));
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

exports.createNewLivestock = async function (params, body) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const {
      nameId,
      gender,
      dob,
      weight,
      phase,
      photoUrl,
      grade,
      breedId,
      typeId,
    } = body;

    //TODO: tambah logic kalo nameId sama di farmId yang sama gaboleh
    if (!nameId) throw new Error("Name ID is required.");
    if (!gender) throw new Error("Gender is required.");
    if (!dob) throw new Error("DOB is required.");
    if (!weight) throw new Error("Weight is required.");
    if (!phase) throw new Error("Phase is required.");
    if (!photoUrl) throw new Error("Photo is required.");
    if (!grade) throw new Error("Grade is required.");
    if (!breedId) throw new Error("Breed ID is required.");
    if (!typeId) throw new Error("Type ID is required.");

    //TODO: tambah logic untuk add mother_id & father_id (optional input),
    //ex: kalo ada, check mother/father_idnya sesuai ga sama db di farmId tsb

    const farm = await Farm.findOne({ where: { id: farmId } });
    if (!farm) throw new Error("Farm not found");

    const breed = await Breed.findByPk(breedId);
    if (!breed) throw new Error("Breed not found");

    const type = await LivestockType.findByPk(typeId);
    if (!type) throw new Error("Type not found");

    const newLivestock = await Livestock.create({
      farm_id: farmId,
      name_id: nameId,
      gender: gender,
      dob: dob,
      weight: weight,
      phase: phase,
      photo_url: photoUrl,
      grade: grade,
      breed_id: breedId,
      type_id: typeId,
    });
    return newLivestock.get({ plain: true });
  } catch (error) {
    console.error("Error creating new livestock:", error.message);
    throw error;
  }
};
