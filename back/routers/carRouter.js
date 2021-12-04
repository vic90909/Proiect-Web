const express = require('express')
const functions =  require('../logic/carLogic.js')

const router= express.Router();

router.post("/cars/random100",async(req,res)=>{
    res.json(await postRandomCars(req,res));
});

router.post("/cars", async(req, res)=>{
    res.json(await functions.postCar(req.body,res));
})

router.get('/cars/users/:userId', async (req, res) => {
    res.json(await functions.getAllCarsForUser(req.params.userId,res));
})

router.get('/cars', async (req, res) => {
    res.json(await functions.getAllCars(req,res));
})

router.get('/cars/:id', async (req, res) => {
    res.json(await functions.getCarById(req.params.id,res));
})

router.delete('/cars/:id', async (req, res) => {
    res.json(await functions.deleteCarById(req.params.id,res));
})

router.put('/cars/:id', async (req, res) =>{
    res.json(await functions.putCarById(req.params.id,req.body,res));
})

router.put('/cars/sell/:id', async (req, res) =>{
    res.json(await functions.buyCar(req.params.id,req.body,res));
})

 
module.exports = router;