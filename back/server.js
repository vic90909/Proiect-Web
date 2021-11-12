

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./firestore/proiect-a12b9-firebase-adminsdk-y85i2-a82cb6c8dd.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(); //this is the reference to the database