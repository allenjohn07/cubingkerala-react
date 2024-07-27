import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    wcaid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const KeralaCubers = mongoose.model("users", userSchema);
