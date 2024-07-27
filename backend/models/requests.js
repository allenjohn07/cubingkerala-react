import mongoose, { model } from "mongoose";

const requestSchema = new mongoose.Schema({
  wcaid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mainevent: { type: String, required: true },
  username: { type: String, required: true },
  imageUrl: { type: String, required: true },
  role: { type: String },
  status: { type: String },
});

export const MemberRequests = new model("requests", requestSchema);
