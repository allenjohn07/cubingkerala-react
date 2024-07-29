import { MemberModel } from "../models/members.js";

export const GetMembers = async (req, res) => {
    try {
        const members = await MemberModel.find();
        if (members) {
          return res.json({
            members,
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
}


export const GetMemberById = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const member = await MemberModel.findOne({ wcaid: id });
    if (!member) {
      return res.status(404).json({
        message: "Not a member",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Is a member",
      status: 200,
      member,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      status: 500,
    });
  }
};