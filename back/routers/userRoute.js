const express = require("express");
const functions = require("../logic/userLogic.js");

const router = express.Router();

router.post("/users/random100", async (req, res) => {
  res.json(await functions.postRandomUsers(req, res));
});

router.get("/users", async (req, res) => {
  try {  
    const response = await functions.getAllUsers()
    res.status(200).json(response);
  } catch(err) {
    res.sendStatus(500)
  }
});

router.get("/users/:id", async (req, res) => {
  functions.getUserById(req.params.id)
    .then((response) =>  {
      if(response === null)
        res.status(404).json({ message: "User not found" });
      else
        res.status(200).json(response);
    })
    .catch(er=>{
      res.status(500).send(er.message)
    })
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
