exports.generateQR = async function (params, body) {
  try {
    const { websiteLink } = params;
    if (!websiteLink || websiteLink === ":websiteLink") {
      throw new Error("Website Link is required.");
    }

    var qrCode = new QRCode("test", {
      text: "http://jindo.dev.naver.com/collie",
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });

    return qrCode.makeCode("")
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