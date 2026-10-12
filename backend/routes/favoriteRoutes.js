import express from "express";
import Favorite from "../models/Favorite.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const list = await Favorite.find({ user: req.user._id }).populate("pet");
  res.json(list);
});

router.post("/:petId", protect, async (req, res) => {
  try {
    const item = await Favorite.create({ user: req.user._id, pet: req.params.petId });
    res.status(201).json(item);
  } catch {
    res.status(409).json({ message: "Already in favorites" });
  }
});

router.delete("/:petId", protect, async (req, res) => {
  await Favorite.deleteOne({ user: req.user._id, pet: req.params.petId });
  res.json({ message: "Removed from favorites" });
});

export default router;
