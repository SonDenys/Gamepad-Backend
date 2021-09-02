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
      owner: req.fields.userId,
      name: req.fields.name,
      gameId: req.fields.gameId,
    });

    // If the favorite game doesn't exist in database
    if (!favorites) {
      const newFavorites = new Favorites({
        // Link the data from the model Favorites to the body of the function addToFavorites
        owner: req.fields.userId,
        name: req.fields.name,
        image: req.fields.image,
        gameId: req.fields.gameId,
      });

      await newFavorites.save();
      // Answer to the client

      res.status(200).json({
        owner: newFavorites.owner,
        name: newFavorites.name,
        image: newFavorites.image,
        gameId: newFavorites.gameId,
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

router.post("/user/favorites/delete", isAuthenticated, async (req, res) => {
  try {
    // Check if the game doesn't already exist in the database
    const favorites = await Favorites.findOne({
      owner: req.fields.userId,
      name: req.fields.name,
      image: req.fields.image,
      gameId: req.fields.gameId,
    });
    // If the favorite game exist in database
    if (favorites) {
      await favorites.delete();
    } else {
      res.status(409).json("This game doesn't exist in your favorites");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/favorites/:id", isAuthenticated, async (req, res) => {
  console.log("favorites");
  try {
    const userId = req.params.id;
    console.log(userId);
    const favorites = await Favorites.find({ owner: userId });
    // .populate({
    //   path: "owner",
    //   select: "account",
    // })
    // .select("name image");
    console.log(favorites);

    res.status(200).json({ favorites: favorites });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
