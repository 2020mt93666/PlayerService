module.exports = app => {
  const players = require("../controllers/player.controller.js");

  var router = require("express").Router();

  // Retrieve all players
  router.get("/", players.findAll);

  // Retrieve a single player with id
  router.get("/:id", players.findOne);

  // Create a new player
  router.post("/", players.create);

  // Update a player with id
  router.put("/:id", players.update);

  // Delete a player with id
  router.delete("/:id", players.delete);

  app.use("/api/players", router);
};
