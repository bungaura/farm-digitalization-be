const Livestock = require("../models/Entity/Livestock.model");
const Farm = require("../models/Entity/Farm.model");
const Breed = require("../models/Entity/Breed.model");
const LivestockType = require("../models/Entity/LivestockType.model");
const LivestockCustomIds = require("../models/Entity/LivestockCustomIds.model");
const { Op } = require("sequelize");
const sequelize = require("sequelize"); // Tambahkan ini
const Lactation = require("../models/Entity/Lactation.model");

exports.getAllLivestocks = async function () {
  try {
    const livestocks = await Livestock.findAll();
    if (!livestocks || livestocks.length === 0) {
      return "No livestocks found";
    }
    return livestocks.map((livestock) => livestock.get({ plain: true }));
  } catch (error) {
    console.error("Error fetching livestock:", error.message);
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
      gender,
      dob,
      weight,
      phase,
      photoUrl,
      grade,
      breedId,
      typeId,
      livestockCondition,
      status,
    } = body;

    //TODO: tambah logic kalo nameId sama di farmId yang sama gaboleh, mother_id & father_id belum
    // if (!nameId) throw new Error("Name ID is required.");
    if (!gender) throw new Error("Gender is required.");
    if (!dob) throw new Error("DOB is required.");
    if (!weight) throw new Error("Weight is required.");
    if (!phase) throw new Error("Phase is required.");
    if (!photoUrl) throw new Error("Photo is required.");
    if (!grade) throw new Error("Grade is required.");
    if (!breedId) throw new Error("Breed ID is required.");
    if (!typeId) throw new Error("Type ID is required.");
    if (!livestockCondition) throw new Error("Condition is required.");
    if (!status) throw new Error("Status is required.");

    //TODO: tambah logic untuk add mother_id & father_id (optional input),
    //ex: kalo ada, check mother/father_idnya sesuai ga sama db di farmId tsb

    const farm = await Farm.findOne({ where: { id: farmId } });
    if (!farm) throw new Error("Farm not found");

    const breed = await Breed.findByPk(breedId);
    if (!breed) throw new Error("Breed not found");

    const type = await LivestockType.findByPk(typeId);
    if (!type) throw new Error("Type not found");

    const femaleOnlyPhases = ["DARA", "HAMIL", "MENYUSUI"];
    if (gender == "MALE" && femaleOnlyPhases.includes(phase)) {
      throw new Error(`Male livestock cannot have phase "${phase}".`);
    }

    let finalNameId;
    let customIdRecord = await LivestockCustomIds.findOne({
      where: { farm_id: farmId, type_id: typeId },
    });

    console.log("Custom ID Record:", customIdRecord); // Debug log

    if (customIdRecord) {
      const nextNumber = customIdRecord.last_number + 1;
      finalNameId = `${customIdRecord.custom_prefix}${String(
        nextNumber
      ).padStart(4, "0")}`;

      console.log("Custom Prefix:", customIdRecord.custom_prefix);

      console.log("Generated finalNameId with custom prefix:", finalNameId); // Debug log

      // Update last_number di LivestockCustomIds
      await customIdRecord.update({ last_number: nextNumber });
    } else {
      // Jika tidak ada custom prefix, buat default ID dengan format 0001, 0002, dst.
      const existingLivestocks = await Livestock.count({
        where: { farm_id: farmId, type_id: typeId },
      });

      finalNameId = String(existingLivestocks + 1).padStart(4, "0");

      console.log("Generated finalNameId without custom prefix:", finalNameId); // Debug log

      // Simpan custom ID baru dengan prefix default (kosong)
      customIdRecord = await LivestockCustomIds.create({
        farm_id: farmId,
        type_id: typeId,
        custom_prefix: "", // Default prefix kosong
        last_number: existingLivestocks + 1,
      });
    }

    const existingLivestock = await Livestock.findOne({
      where: { farm_id: farmId, name_id: finalNameId },
    });

    if (existingLivestock) {
      throw new Error(
        `Livestock with ID ${finalNameId} already exists in this farm.`
      );
    }

    const newLivestock = await Livestock.create({
      farm_id: farmId,
      name_id: finalNameId,
      gender: gender,
      dob: dob,
      weight: weight,
      phase: phase,
      photo_url: photoUrl,
      grade: grade,
      breed_id: breedId,
      type_id: typeId,
      livestock_condition: livestockCondition,
      status: status,
    });
    return newLivestock.get({ plain: true });
  } catch (error) {
    // console.error("Error creating new livestock:", error.message);
    console.error(
      "Error creating new livestock:",
      error.errors || error.message
    );
    throw new Error(
      error.errors
        ? error.errors.map((err) => err.message).join(", ")
        : error.message
    );
    // throw error;
  }
};

exports.getFilteredLivestocks = async function (queryParams) {
  try {
    const { query, livestockType, phase, gender, condition, status, sortBy } =
      queryParams;

    const whereClause = {};

    if (query) {
      whereClause[Op.or] = [
        { id: { [Op.like]: `%${query}%` } },
        { grade: { [Op.like]: `%${query}%` } },
        sequelize.where(sequelize.col("BreedAlias.name"), {
          [Op.like]: `%${query}%`,
        }),
      ];
    }

    if (livestockType) {
      whereClause["$LivestockType.type$"] = livestockType;
    }

    if (phase) whereClause.phase = phase;
    if (gender) whereClause.gender = gender;
    if (condition) whereClause.condition = condition;
    if (status) whereClause.status = status;

    let orderBy = [["createdAt", "DESC"]]; // Default sort by latest added (paling baru)
    if (sortBy === "oldest") orderBy = [["createdAt", "ASC"]];
    if (sortBy === "latestUpdated") orderBy = [["updatedAt", "DESC"]];
    if (sortBy === "nameAsc") orderBy = [["name_id", "ASC"]];
    if (sortBy === "nameDesc") orderBy = [["name_id", "DESC"]];

    const livestocks = await Livestock.findAll({
      where: whereClause,
      include: [
        { model: Breed, attributes: ["name"], as: "BreedAlias" }, // Tambahkan alias
        { model: LivestockType, attributes: ["type"] },
      ],
      order: orderBy,
    });

    if (!livestocks || livestocks.length === 0) {
      return "No livestocks found";
    }

    return livestocks.map((livestock) => livestock.get({ plain: true }));
  } catch (error) {
    console.error("Error fetching filtered livestocks:", error.message);
    throw error;
  }
};


exports.changeLivestockPhase = async function (params, body) {
  try {
    const { livestockId } = params;
    if (!livestockId || livestockId === ":livestockId")
      throw new Error("Livestock ID is required.");

    const { phase } = body;
    if (!phase) throw new Error("Phase to be changed is required.");

    const livestock = await Livestock.findByPk(livestockId);
    if (!livestock) throw new Error("Livestock not found.");

    if (
      livestock.gender === "MALE" &&
      ["DARA", "HAMIL", "MENYUSUI", "PEMULIHAN"].includes(phase)
    ) {
      throw new Error("Male livestock cannot have this phase.");
    }

    if (phase === "HAMIL") {
      // Cek apakah ada spouse yang sudah ditambahkan sebelumnya
      const latestLactation = await Lactation.findOne({
        where: { livestock_id: livestockId },
        order: [["lactation_number", "DESC"]],
      });

      if (!latestLactation || !latestLactation.spouse_id) {
        throw new Error(
          "Cannot change phase to HAMIL. Please add a spouse first."
        );
      }
    }

    // Update livestock phase
    livestock.phase = phase;
    await livestock.save();
    return { message: "Livestock phase updated successfully.", livestock };
  } catch (error) {
    throw error;
  }
};

exports.getFarmLivestocks = async function (param) {
  try {
    const { farmId } = param;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm ID is required.");
    }

    const livestocks = await Livestock.findAll(
      { where: {farm_id: farmId}}
    );
    if (!livestocks || livestocks.length === 0) {
      return "No livestocks found";
    }

    return livestocks.map((livestock) => livestock.get({ plain: true }));
  } catch (error) {
    console.error("Error fetching livestock:", error.message);
    throw error;
  }
}


exports.getLivestockDetail = async function (param) {
  try {
    const { livestockId } = param;
    if (!livestockId || livestockId === ":nameId") {
      throw new Error("Name Id is required.");
    }

    const livestock = await Livestock.findOne(
      { where: {id: livestockId}}
    );
    if (!livestock || livestock.length === 0) {
      return "No livestocks found";
    }
    
    return livestock;
  } catch (error) {
    console.error("Error fetching livestock:", error.message);
    throw error;
  }
}

