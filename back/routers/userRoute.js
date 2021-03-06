const express = require("express");
const functions = require("../logic/userLogic.js");

const router = express.Router();

router.post("/users/random100", async (req, res) => {
  res.json(await functions.postRandomUsers(req, res));
});

router.get("/users", async (req, res) => {
  res.json(await functions.getAllUsers(req, res));
});

router.get("/users/:id", async (req, res) => {
  res.json(await functions.getUserById(req.params.id, res));
});

router.get("/users/email/:email", async (req, res) => {
  res.json(await functions.getUserByEmail(req.params.email, res));
});

router.delete("/users/:id", async (req, res) => {
  res.json(await functions.deleteUserById(req.params.id, res));
});

router.put("/users/user/:id", async (req, res) => {
  res.json(await functions.putUserById(req.params.id, req.body, res));
});

router.put("/users/admin/:id", async (req, res) => {
  res.json(await functions.admin(req.params.id, req.body, res));
});

module.exports = router;
