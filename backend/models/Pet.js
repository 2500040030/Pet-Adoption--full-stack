import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  species: { type: String, enum: ["Dog", "Cat", "Rabbit", "Bird", "Other"], default: "Dog" },
  age: { type: Number, required: true },
  size: { type: String, enum: ["Small", "Medium", "Large"], default: "Medium" },
  gender: { type: String, enum: ["Male", "Female"], default: "Male" },
  category: { type: String, default: "Rescue" },
  description: String,
  image: String,
  location: String,
  healthStatus: { type: String, default: "Healthy" },
  vaccinations: [String],
  medicalHistory: [String],
  rescueHistory: String,
  adoptionStatus: {
    type: String,
    enum: ["Available", "Pending", "Adopted"],
    default: "Available"
  },
  shelter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Pet", petSchema);
