var express = require("express");
var router = express.Router();
var db = require("../database");
var jwt = require("../node_modules/jsonwebtoken");
const bcrypt = require("../node_modules/bcrypt");
var faker = require("../node_modules/faker");
const { vehicle } = require("faker");
const usersFunctions = require("../logic/userLogic.js");

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

postRandomCars = async (req, res) => {
  const usersIds = await usersFunctions.getAllUsersIds();
  let vehicles = [];
  for (let i = 0; i < 100; i++) {
    let vehicle = {
      manufacturer: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      price: faker.commerce.price() * 100,
      plate: faker.vehicle.vin(),
      color: faker.vehicle.color(),
      description: faker.commerce.description(),
      userId: usersIds[Math.floor(Math.random() * usersIds.length)].id,
    };
    await db.collection("Cars").add(vehicle);
    vehicles.push(vehicle);
  }
  res.status(200).send(vehicles);
};

buyCar = async (id, body, res) => {
  let seller = null;
  let buyer = null;
  console.log(id)
  console.log(body)
  await db
    .collection("Users")
    .doc(body.idSeller)
    .get()
    .then(async (responseSeller) => {
      seller = responseSeller;
      console.log(seller.data())
      await db
        .collection("Users")
        .doc(body.idBuyer)
        .get()
        .then(async (responseBuyer) => {
          buyer = responseBuyer;
          console.log(buyer)
          const car = await db.collection("Cars").doc(id).get();

          if (
            typeof car.data() !== "undefined" &&
            typeof seller.data() !== "undefined" &&
            typeof buyer.data() !== "undefined"
          ) {
            let newCar = {
              userId: buyer.id,
            };

            db.collection("Cars")
              .doc(id)
              .update(newCar)
              .then(() => {
                res.status(200).send({ message: "Update successful" });
              })
              .catch((err) => {
                res.status(500).send({ message: err.message });
              });
          } else {
            res.status(404).send({ message: "Not found" });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

getAllCars = async () => {
  const snapshot = await db.collection("Cars").get();
  let cars = [];
  snapshot.forEach((doc) => {
    let car = {
      id: doc.id,
      userId: doc.data().userId,
      manufacturer: doc.data().manufacturer,
      model: doc.data().model,
      color: doc.data().color,
      plate: doc.data().plate,
      price: doc.data().price,
      description: doc.data().description
    };
    cars.push(car);
  });

  // res.status(200).send(cars); //* should be handled by caller
  return cars  //* return the data
};

getAllCarsForUser = async (id, res) => {
  const snapshot = await db.collection("Cars").where("userId", "==", id).get();
  let cars = [];
  snapshot.forEach((doc) => {
    let car = {
      id: doc.id,
      userId: doc.data().userId,
      manufacturer: doc.data().manufacturer,
      model: doc.data().model,
      color: doc.data().color,
      plate: doc.data().plate,
      price: doc.data().price,
      description: doc.data().description
    };
    cars.push(car);
  });

  res.status(200).send(cars);
  return
};

getCarById = async (id) => {
  return db  //* return the promise
    .collection("Cars")
    .doc(id)
    .get()
    .then((response) => {
      let car = {
        id: response.id,
        userId: response.data().userId,
        manufacturer: response.data().manufacturer,
        model: response.data().model,
        color: response.data().color,
        plate: response.data().plate,
        price: response.data().price,
        description: response.data().description,
      }
      return car
    })
    .catch((err) => {
      return null
    });
};

postCar = async (body, res) => {
  await db
    .collection("Users")
    .doc(body.userId)
    .get()
    .then(async () => {
      let car = {
        manufacturer: body.manufacturer,
        model: body.model,
        price: body.price,
        plate: body.plate,
        color: body.color,
        userId: body.userId,
        description: body.description,
      };
      await db.collection("Cars").add(car).then(response => {
        res.status(200).send(response._path.segments[1]);
      });
    })
    .catch((err) => {
      res.status(404).send({ message: err.message });
    });
};

deleteCarById = async (id, res) => {
  let car = await db.collection("Cars").doc(id).get();
  if (typeof car.data() === "undefined") {
    res.status(404).send({ message: "Not found" });
  } else {
    await db
      .collection("Cars")
      .doc(id)
      .delete()
      .then((car) => {
        res.status(200).send("Car with id " + id + " deleted");
      })
      .catch((err) => {
        res.status(404).send({ message: err });
      });
  }
};

putCarById = async (id, body) => {
  let user = await db.collection("Users").doc(body.userId).get();
  let car = await db.collection("Cars").doc(id).get();
  console.log(car,user)
  if (typeof car.data() === "undefined") {
    return null
  } else if (typeof user.data() === "undefined") {
    return null
  } else {
    db
      .collection("Cars")
      .doc(id)
      .update(body)
      .then((car) => {
        return { message: "Car with id " + id + " updated" };
      })
      .catch((err) => {
        return null;
      });
  }
};

module.exports = {
  postRandomCars,
  getAllCarsForUser,
  getAllCars,
  getCarById,
  postCar,
  deleteCarById,
  putCarById,
  buyCar,
};
