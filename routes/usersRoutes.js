const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");




module.exports = (userCollection) => {
  router.get("/", (req, res) => usersController.getAllUsers(req, res, userCollection));
  router.get("/:id", (req, res) => usersController.getUserById(req, res, userCollection));
  router.post("/", (req, res) => usersController.addUser(req, res, userCollection));
  router.patch("/:id", (req, res) => usersController.updateUser(req, res, userCollection));
  router.delete("/:id", (req, res) => usersController.deleteUser(req, res, userCollection));
  return router;
};
