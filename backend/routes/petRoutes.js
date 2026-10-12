import express from "express";
import Pet from "../models/Pet.js";
import { protect, roles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, breed, age, size, species, status } = req.query;
    const q = {};
    if (search) q.$or = [
      { name: { $regex: search, $options: "i" } },
      { breed: { $regex: search, $options: "i" } }
    ];
    if (breed) q.breed = { $regex: breed, $options: "i" };
    if (age) q.age = { $lte: Number(age) };
    if (size) q.size = size;
    if (species) q.species = species;
    if (status) q.adoptionStatus = status;
    const pets = await Pet.find(q).populate("shelter", "name shelterName");
    res.json(pets);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("shelter", "name shelterName email");
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch {
    res.status(404).json({ message: "Pet not found" });
  }
});

router.post("/", protect, roles("shelter", "admin"), async (req, res) => {
  try {
    const pet = await Pet.create({ ...req.body, shelter: req.user._id });
    res.status(201).json(pet);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put("/:id", protect, roles("shelter", "admin"), async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (req.user.role !== "admin" && pet.shelter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your listing" });
    }
    Object.assign(pet, req.body);
    await pet.save();
    res.json(pet);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete("/:id", protect, roles("shelter", "admin"), async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (req.user.role !== "admin" && pet.shelter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your listing" });
    }
    await pet.deleteOne();
    res.json({ message: "Pet deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
