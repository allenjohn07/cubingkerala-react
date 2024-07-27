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