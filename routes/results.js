const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

// Import models
const Results = require("../models/Results");

router.get("/", async (req, res) => {
  try {
    const results = await Results.find();
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
