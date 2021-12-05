const express = require('express')
const functions = require('../logic/carLogic.js')

const router = express.Router();

router.post("/cars/random100", async (req, res) => {
    res.json(await postRandomCars(req, res));
});

router.post("/cars", async (req, res) => {
    res.json(await functions.postCar(req.body, res));
})

router.get('/cars/users/:userId', async (req, res) => {
    res.json(await functions.getAllCarsForUser(req.params.userId, res));
})

router.get('/cars', async (req, res) => {
    try {
        const response = await functions.getAllCars()
        res.status(200).json(response);
    } catch (err) {
        res.sendStatus(500)
    }
})

router.get('/cars/:id', async (req, res) => {
    functions.getCarById(req.params.id)
        .then((response) => {
            if (response === null)
                res.status(404).json({ message: "Car not found" });
            else
                res.status(200).json(response);
        })
        .catch(er => {
            res.status(500).send(er.message)
        })
})

router.delete('/cars/:id', async (req, res) => {
    res.json(await functions.deleteCarById(req.params.id, res));
})

router.put('/cars/:id', async (req, res) => {
    functions.putCarById(req.params.id,req.body).then((response) => {
        if (response === null) {
            res.status(404).json({ message: "Car not found" })
        } else {
            res.status(200).json(response)
        }
    }).catch(err => {
        res.status(500).send(err.message)
    })
})

router.put('/cars/sell/:id', async (req, res) => {
    res.json(await functions.buyCar(req.params.id, req.body, res));
})


module.exports = router;