import mongoose, { model } from "mongoose";

const memberSchema = new mongoose.Schema({
  wcaid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mainevent: { type: String, required: true },
  username: { type: String, required: true },
  imageUrl: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, required: true },
});

export const MemberModel = new model("members", memberSchema);
