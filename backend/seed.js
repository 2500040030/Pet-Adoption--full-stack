import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Pet from "./models/Pet.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.deleteMany({});
await Pet.deleteMany({});

const password = async (p) => bcrypt.hash(p, 10);

const admin = await User.create({
  name: "Platform Admin",
  email: "admin@petadopt.com",
  password: await password("Admin@123"),
  role: "admin",
  verified: true
});

const shelter = await User.create({
  name: "Green Paws Shelter",
  shelterName: "Green Paws Shelter",
  email: "shelter@petadopt.com",
  password: await password("Shelter@123"),
  role: "shelter",
  phone: "9876543210",
  address: "Kochi, Kerala",
  verified: true
});

await User.create({
  name: "Demo Adopter",
  email: "user@petadopt.com",
  password: await password("User@123"),
  role: "adopter",
  phone: "9000000000",
  address: "Kochi, Kerala"
});

const pets = [
  {
    name: "Bruno", breed: "Labrador Retriever", species: "Dog", age: 2,
    size: "Large", gender: "Male", category: "Rescue",
    description: "Friendly and energetic Labrador looking for a loving family.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
    location: "Kochi", healthStatus: "Healthy",
    vaccinations: ["Rabies", "DHPP"], medicalHistory: [], rescueHistory: "Rescued from the street.",
    shelter: shelter._id
  },
  {
    name: "Luna", breed: "Indie Cat", species: "Cat", age: 1,
    size: "Small", gender: "Female", category: "Rescue",
    description: "Calm, affectionate cat that enjoys quiet homes.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
    location: "Kochi", healthStatus: "Healthy",
    vaccinations: ["Rabies"], medicalHistory: [], rescueHistory: "Found near a community park.",
    shelter: shelter._id
  },
  {
    name: "Milo", breed: "Beagle", species: "Dog", age: 3,
    size: "Medium", gender: "Male", category: "Rescue",
    description: "Playful Beagle who loves walks and children.",
    image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=900&q=80",
    location: "Thrissur", healthStatus: "Healthy",
    vaccinations: ["Rabies", "DHPP"], medicalHistory: ["Minor skin infection - recovered"],
    rescueHistory: "Rescued from an unsafe home.",
    shelter: shelter._id
  }
];

await Pet.insertMany(pets);
console.log("Seed complete");
console.log("Admin: admin@petadopt.com / Admin@123");
console.log("Shelter: shelter@petadopt.com / Shelter@123");
console.log("Adopter: user@petadopt.com / User@123");
await mongoose.disconnect();
