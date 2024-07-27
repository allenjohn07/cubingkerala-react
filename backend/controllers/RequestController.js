import { MemberModel } from "../models/members.js";
import { MemberRequests } from "../models/requests.js";

export const addRequest = async (req, res) => {
  const form = req.body;
  try {
    const existingRequest = await MemberRequests.findOne({ wcaid: form.wcaid });
    if (existingRequest) {
      return res.json({
        message: "Request already sumbitted",
        status: 404,
      });
    }
    await MemberRequests.create(form);
    return res.json({
      message: "Request submitted",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error,
      status: 403,
    });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await MemberRequests.find();
    if (requests) {
      return res.json({
        requests,
        status: 200,
      });
    }
    return res.json({
      status: 404,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error,
      status: 404,
    });
  }
};

export const editRequest = async (req, res) => {
  const { member } = req.body;
  try {
    const updatedMember = await MemberRequests.findOneAndUpdate(
      { wcaid: member.wcaid },
      { $set: { role: member.role, status: member.status } },
      { new: true }
    );
    if (!updatedMember) {
      return res.json({
        message: "Member does not exist",
        status: 404,
      });
    }

    const existingMember = await MemberModel.findOne({
      wcaid: updatedMember.wcaid,
    });

    if (existingMember) {
      await MemberModel.updateOne({ wcaid: updatedMember.wcaid }, {
        $set: { role: updatedMember.role, status: updatedMember.status}
      });
      return res.json({
        message: "Member updated successfully",
        status: 200,
      });
    }

    await MemberModel.create(updatedMember.toObject());

    return res.json({
      message: "Member updated successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error.message,
      status: 403,
    });
  }
};
