const functions = require("firebase-functions");
const admin  = require ('firebase-admin');
const { json } = require("express");

admin.initializeApp();

const express = require('express');
const app = express();


 exports.getScreams = functions.https.onRequest((req, res)=>{
    admin.firestore().collection('screams').get()
        .then(data =>{
            let screams = [];
            data.forEach(doc =>{
                screams.push(doc.data());
            });
            return res.json(screams);
        })
        .catch(err => console.error(err));
 });

 exports.createScream = functions.https.onRequest((req, res)=>{
     if (req.method !== 'POST'){
         return res.status(400).json({ error: 'Method not allowed'});
     }
    const newScream = {
        body: req.body.body, 
        userHandle: req.body.userHandle, 
        createAt: admin.firestore.Timestamp.fromDate(new Date()) 
    };

    admin.firestore()
        .collection('screams')
        .add(newScream)
        .then(doc =>{
            res.json({message: `document ${doc.id} created sucessfully`});
        })

            .catch(err => {
                res.status(500).json({error: 'something went wrong'});
                console.error(err);
            })
 });
