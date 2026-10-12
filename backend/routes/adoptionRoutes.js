import express from "express";
import Adoption from "../models/Adoption.js";
import Pet from "../models/Pet.js";
import { protect, roles } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, roles("adopter"), async (req, res) => {
  try {
    const { pet, reason, homeType, experience } = req.body;
    const target = await Pet.findById(pet);
    if (!target) return res.status(404).json({ message: "Pet not found" });
    if (target.adoptionStatus !== "Available") {
      return res.status(400).json({ message: "Pet is not currently available" });
    }
    const existing = await Adoption.findOne({ pet, applicant: req.user._id, status: "Pending" });
    if (existing) return res.status(409).json({ message: "Application already submitted" });

    const application = await Adoption.create({
      pet, applicant: req.user._id, reason, homeType, experience
    });
    target.adoptionStatus = "Pending";
    await target.save();
    res.status(201).json(application);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get("/mine", protect, async (req, res) => {
  const apps = await Adoption.find({ applicant: req.user._id })
    .populate("pet", "name breed image adoptionStatus")
    .sort({ createdAt: -1 });
  res.json(apps);
});

router.get("/shelter", protect, roles("shelter", "admin"), async (req, res) => {
  const filter = req.user.role === "admin" ? {} : {};
  const pets = req.user.role === "admin"
    ? await Pet.find().select("_id")
    : await Pet.find({ shelter: req.user._id }).select("_id");
  const petIds = pets.map(p => p._id);
  const apps = await Adoption.find({ ...filter, pet: { $in: petIds } })
    .populate("pet", "name breed image")
    .populate("applicant", "name email phone address")
    .sort({ createdAt: -1 });
  res.json(apps);
});

router.patch("/:id/status", protect, roles("shelter", "admin"), async (req, res) => {
  const { status } = req.body;
  if (!["Approved", "Rejected", "Pending", "Cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const app = await Adoption.findById(req.params.id).populate("pet");
  if (!app) return res.status(404).json({ message: "Application not found" });

  if (req.user.role !== "admin" && app.pet.shelter.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not your application" });
  }

  app.status = status;
  await app.save();

  if (status === "Approved") {
    await Pet.findByIdAndUpdate(app.pet._id, { adoptionStatus: "Adopted" });
  } else if (status === "Rejected") {
    await Pet.findByIdAndUpdate(app.pet._id, { adoptionStatus: "Available" });
  }

  res.json(app);
});

export default router;
