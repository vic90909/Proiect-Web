const express = require('express');
var cors = require('cors')
var jwt = require('jsonwebtoken')
const app = express();
var morgan = require('morgan');
const { nextTick } = require('process');
var faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const port = 3000;

const bcrypt = require('bcrypt');
const { exists } = require('fs');
const secret = "ProgramareWeb"

app.use(cors())
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

var carsRouter = require('./routers/carRouter');
var usersRouter = require('./routers/userRoute');

app.use('/', carsRouter);
app.use('/', usersRouter);

var db = require('./database')

app.post('/register', async (req, res) => {
  let data = req.body;
  let emailExist = false;

  const userRef = db.collection('Users');
  const snapshot = await userRef.where('email', '==', data.email).get();
  if (!snapshot.empty) {
    emailExist = true;
  };

  if (emailExist) {
    res.send({message:"User already registered.",exist: true})
  }
  else {
    bcrypt.hash(data.password, 12).then(async function (hash) {
      data.password = hash;
      const user = await db.collection('Users').add(data);
      console.log(`You've just register with id ${user.id}`);
      res.status(200).send({message:"Succesfull registration"});
    });
  }
});

app.post('/login', async (req, res) => {
  let data = req.body;

  let emailFound = false;

  const usersRef = db.collection('Users');
  const snapshot = await usersRef.where('email', '==', data.email).get();

  if (snapshot.empty) {
    let response = {};
    response.message = "No such email address.";
    res.json(response);
  } else {
    emailFound = true;
    snapshot.forEach(doc => {
      bcrypt.compare(data.password, doc.data().password).then(async function (result) {
        if (result) {
          let token = jwt.sign({
            email: doc.data().email
          }, secret, { expiresIn: 60 * 60 });

          let response = {};
          response.token = token;
          response.id = doc.id;
          response.message = 'You have the right to access private resources'
          
          res.send(response);
        }
        else {
          let response = {};
          response.message = "Password missmatch";
          res.send(response)
        }
      });
    });
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

