import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reason: { type: String, required: true },
  homeType: { type: String, required: true },
  experience: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Cancelled"],
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("Adoption", adoptionSchema);
