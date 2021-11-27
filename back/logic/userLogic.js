var db = require("../database");
var jwt = require("../node_modules/jsonwebtoken");
const bcrypt = require("../node_modules/bcrypt");
var faker = require("../node_modules/faker");
const { name, phone } = require("faker");

const secret = "ProgramareWeb";

//Check auth
function checkAuthorization(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[0];
    req.token = bearerToken;

    jwt.verify(req.token, secret, (err, decoded) => {
      if (err) {
        if (err.expiredAt) {
          res.json({ message: "Your token expired!" });
        } else {
          res.json({ message: "Decoding error!" + bearerToken });
        }
      } else {
        console.log(decoded.email);
        next();
      }
    });
  } else {
    res.json({ message: "Missing token!" });
  }
}

/* Products operations */

getAllUsers = async (req, res) => {
  let users = [];
  //Get all products
  const response = await db.collection("Users").get();
  //Iterate over
  response.forEach((doc) => {
    let user = {};
    user.id = doc.id;
    user.firstName = doc.data().firstName;
    user.lastName = doc.data().lastName;
    user.gender = doc.data().gender;
    user.jobTitle = doc.data().jobTitle;
    user.phone = doc.data().phone;
    user.email = doc.data().email;
    users.push(user);
  });

  //Respond with products array
  return users;
};

postRandomUsers = async () => {
  for (let i = 0; i < 100; i++) {
    let user = {
      firstName: name.firstName(),
      lastName: name.lastName(),
      gender: name.gender(),
      jobTitle: name.jobTitle(),
      phone: phone.phoneNumber(),
    };
    user.email = user.firstName + user.lastName + "@gmail.com";
    bcrypt.hash(user.lastName, 12).then(async function (hash) {
      user.password = hash;
      const res = await db.collection("Users").add(user);
      console.log(user);
    });
  }
  res.status(200).send({ message: "Success" });
};

getAllUsersIds = async (req, res) => {
  let usersIds = [];
  const response = await db.collection("Users").get();
  response.forEach((doc) => {
    let user = {};
    user.id = doc.id;
    usersIds.push(user);
  });

  return usersIds;
};

getUserById = async (id, res) => {
  await db
    .collection("Users")
    .doc(id)
    .get()
    .then((response) => {
      let user = {};
      user.id = response.id;
      user.firstName = response.data().firstName;
      user.lastName = response.data().lastName;
      user.gender = response.data().gender;
      user.jobTitle = response.data().jobTitle;
      user.phone = response.data().phone;
      user.email = response.data().email;

      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(404).send({ message: "User not found" });
    });
};

getUserByEmail = async (email, res) => {
  let users = [];
  try {
    const snapshot = await db
      .collection("Users")
      .where("email", "==", email)
      .get();
    snapshot.forEach((doc) => {
      let user = {};
      user.id = doc.id;
      user.firstName = doc.data().firstName;
      user.lastName = doc.data().lastName;
      user.gender = doc.data().gender;
      user.jobTitle = doc.data().jobTitle;
      user.phone = doc.data().phone;
      user.email = doc.data().email;
      users.push(user);
      console.log(user);
    });
    if (users.length > 0) {
      res.status(200).send(users);
    } else {
      res.status(404).send({ message: "Not Found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

deleteUserById = async (id, res) => {
  let user = await db.collection("Users").doc(id).get();
  if (typeof user.data() === "undefined") {
    res.status(404).send({ message: "Not found" });
  } else {
    await db
      .collection("Users")
      .doc(id)
      .delete()
      .then((user) => {
        res.status(200).send("User with id " + id + " deleted");
      })
      .catch((err) => {
        res.status(404).send({ message: err });
      });
  }
};

module.exports = {
  getAllUsers,
  postRandomUsers,
  getAllUsersIds,
  getUserById,
  deleteUserById,
  getUserByEmail,
};
