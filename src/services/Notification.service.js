const Notification = require("../models/Entity/Notification.model");
const UserFarm = require("../models/Entity/UserFarms.model");
const User = require("../models/Entity/User.model");
const Farm = require("../models/Entity/Farm.model");

exports.inviteOperator = async function (params, body) {
  try {
    const { farmId } = params;
    if (!farmId || farmId == ":farmId") {
      throw new Error("Farm Id is required");
    }
    const { operatorEmail } = body;

    const operator = await User.findOne({ where: { email: operatorEmail } });
    if (!operator) throw new Error("User not found.");

    const existingUserFarm = await UserFarm.findOne({
      where: { user_id: operator.id, farm_id: farmId },
    });

    if (existingUserFarm) {
      throw new Error("Operator is already associated with this farm.");
    }

    if (operator.role === "OWNER") {
      throw new Error("User's role must be operator.");
    }
    const notification = await Notification.create({
      user_id: operator.id,
      farm_id: farmId,
      description: "invited",
    });

    return {
      message: "Operator invited successfully.",
      notification: notification,
    };
  } catch (error) {
    throw error;
  }
};

exports.acceptInvitation = async function (params, body) {
  try {
    const { operatorEmail } = params;
    const { action } = body;

    if (!operatorEmail || operatorEmail === ":operatorEmail") {
      throw new Error("Operator email is required.");
    }
    if (!action || !["ACCEPT", "DECLINE"].includes(action)) {
      throw new Error("Valid action ('ACCEPT' or 'DECLINE') is required.");
    }

    // Find the notification
    const notification = await Notification.findOne({
      where: {
        description: "invited",
      },
      include: [
        {
          model: User,
          where: { email: operatorEmail },
        },
      ],
    });

    if (!notification) {
      throw new Error("Invitation not found.");
    }

    const operatorId = notification.user_id;
    const farmId = notification.farm_id;

    if (action === "ACCEPT") {
      // Check if operator is already associated with the farm
      const existingUserFarm = await UserFarm.findOne({
        where: {
          user_id: operatorId,
          farm_id: farmId,
        },
      });

      if (existingUserFarm) {
        throw new Error("Operator is already associated with this farm.");
      }

      // Mark the notification as read
      notification.read_status = true;
      await notification.save();

      // Add the operator to UserFarms table
      await UserFarm.create({
        user_id: operatorId,
        farm_id: farmId,
        role: "OPERATOR",
      });

      // Notify the owner about the accepted invitation
      const farm = await Farm.findByPk(farmId);
      if (!farm) throw new Error("Farm not found.");

      const ownerId = farm.owner_id;
      await Notification.create({
        user_id: ownerId,
        farm_id: farmId,
        description: `Operator dengan email ${operatorEmail} menerima undangan Anda dan masuk ke ${farm.name}.`,
      });

      await Notification.create({
        user_id: operatorId,
        farm_id: farmId,
        description: `Kamu baru saja menerima undangan masuk ke ${farm.name}.`,
      });
    } else if (action === "DECLINE") {
      const farm = await Farm.findByPk(farmId);
      if (!farm) throw new Error("Farm not found.");

      const ownerId = farm.owner_id;
      await Notification.create({
        user_id: ownerId,
        farm_id: farmId,
        description: `Operator dengan ${operatorEmail} menolak undangan Anda.`,
      });

      await Notification.create({
        user_id: operatorId,
        farm_id: farmId,
        description: `Kamu baru saja menolak undangan masuk ke ${farm.name}.`,
      });
    }

    return {
      message:
        action === "ACCEPT"
          ? "Invitation accepted successfully."
          : "Invitation declined.",
    };
  } catch (error) {
    throw error;
  }
};

exports.readNotifications = async function (params) {
  try {
    const { userId } = params;

    if (!userId || userId === ":userId") {
      throw new Error("User ID is required.");
    }

    const notifications = await Notification.findAll({
      where: {
        user_id: userId,
        read_status: false,
      },
    });

    if (notifications.length === 0) {
      return { message: "No unread notifications found." };
    }

    await Notification.update(
      { read_status: true },
      {
        where: {
          user_id: userId,
          read_status: false,
        },
      }
    );

    return {
      message: "Notifications marked as read successfully.",
      notifications: notifications.map((notif) => ({
        id: notif.id,
        description: notif.description,
        createdAt: notif.createdAt,
        farm_id: notif.farm_id,
        read_status: notif.read_status,
      })),
    };
  } catch (error) {
    throw error;
  }
};

exports.getAllMembers = async function (params) {
  try {
    const { farmId } = params;
    if (!farmId || farmId === ":farmId") {
      throw new Error("Farm Id is required");
    }

    const members = await UserFarm.findAll({
      where: { farm_id: farmId },
      include: [
        {
          model: User,
          attributes: ["name", "email", "role"],
        },
      ],
    });

    return members.map((member) => ({
      name: member.User.name,
      email: member.User.email,
      role: member.role,
      joinedAt: member.createdAt,
    }));
  } catch (error) {
    throw error;
  }
};
