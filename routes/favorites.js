const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

// Import models
const Favorites = require("../models/Favorites");

router.post("/user/favorites/add", isAuthenticated, async (req, res) => {
  console.log("/user/favorites/add");
  try {
    // Check if the game doesn't already exist in the database
    const favorites = await Favorites.findOne({
      id: req.fields.id,
    });

    // If the favorite game doesn't exist in database
    if (!favorites) {
      const newFavorites = new Favorites({
        id: req.fields.id,
        name: req.fields.name,
        image: req.fields.image,
      });

      await newFavorites.save();
      // Answer to the client

      res.status(200).json({
        id: newFavorites.id,
        name: newFavorites.name,
        image: newFavorites.image,
      });
    } else {
      res
        .status(409)
        .json({ message: "This game is already among your favorites" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete(
  "/user/favorites/delete/:id",
  isAuthenticated,
  async (req, res) => {
    try {
      const id = req.params.id;
      const resultToDelete = await Favorites.findById(id);

      await resultToDelete.delete();

      res.status(200).json("Favorite deleted succesfully");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("/user/favorites", isAuthenticated, async (req, res) => {
  try {
    const favorites = await Favorites.find()
      .populate({
        path: "owner",
        select: "account",
      })
      .select("name image");

    res.status(200).json({ favorites: favorites });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
