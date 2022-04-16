const db = require("../models");
const PlayerModel = db.players;

// Create and Save a new player
exports.create = async (req, res, next) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Name
Type
Team
Runs
Wickets
Catches
  // Create a player
  const player = new PlayerModel({
    name: req.body.name,
    type: req.body.type,
    team: req.body.team,
    runs: req.body.runs,
    wickets: req.body.wickets,
    catches: req.body.catches
  });

  try {
    // Save player in the database
    const data = await player.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the player."
    });
  }
};

// Retrieve all players from the database.
exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name ? {
    name: {
      $regex: new RegExp(name),
      $options: "i"
    }
  } : {};

  try {
    const data = await PlayerModel.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving players."
    });
  }
};

// Find a single player with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await PlayerModel.findById(id);
    if (!data)
      res.status(404).send({
        message: "Not found player with id " + id
      });
    else res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving player with id=" + id
    });
  }
};

// Update a player by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  try {
    const data = await PlayerModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot update player with id=${id}. Maybe player was not found!`
      });
    } else res.send({
      message: "player was updated successfully."
    });
  } catch (err) {
    res.status(500).send({
      message: "Error updating player with id=" + id
    });
  }
};

// Delete a player with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await PlayerModel.findByIdAndRemove(id, {
      useFindAndModify: false
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot delete player with id=${id}. Maybe player was not found!`
      });
    } else {
      res.send({
        message: "player was deleted successfully!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete player with id=" + id
    });
  }
};