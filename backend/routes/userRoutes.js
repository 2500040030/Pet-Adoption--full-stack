import express from "express";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
import Adoption from "../models/Adoption.js";
import { protect, roles } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

router.put("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const allowed = ["name", "phone", "address"];
  allowed.forEach(k => {
    if (req.body[k] !== undefined) user[k] = req.body[k];
  });
  await user.save();
  res.json(user);
});

router.get("/dashboard", protect, roles("shelter", "admin"), async (req, res) => {
  const petQuery = req.user.role === "admin" ? {} : { shelter: req.user._id };
  const pets = await Pet.find(petQuery);
  const petIds = pets.map(p => p._id);
  const applications = await Adoption.countDocuments({ pet: { $in: petIds } });
  res.json({
    pets: pets.length,
    available: pets.filter(p => p.adoptionStatus === "Available").length,
    adopted: pets.filter(p => p.adoptionStatus === "Adopted").length,
    applications
  });
});

export default router;
