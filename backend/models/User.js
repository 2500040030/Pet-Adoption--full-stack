import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: String,
  address: String,
  role: { type: String, enum: ["adopter", "shelter", "admin"], default: "adopter" },
  shelterName: String,
  verified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
