const express = require("express")
const router = express.Router()
const dbjson = require("../db/db.json")
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

//get dbjson
router.get('/notes', (req, res) => { 
    console.log("Note Get")
    res.json(dbjson)
})

//post notes and update db file
router.post('/notes', (req, res) => {

    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    }

    dbjson.push(newNote)

    fs.writeFile("../Develop/db/db.json", JSON.stringify(dbjson, null, 4), (err)=>{
        if (err) throw err
       })

    console.log("Note Posted")
    res.send(dbjson)
})

//delete note and update db file
router.delete('/notes/:id', (req, res) => {

    let deleteIndex;
    dbjson.forEach((json, i)=>{
        if (req.params.id === json.id){
            deleteIndex = i
        }
    })
    if(deleteIndex == null) return

    dbjson.splice(deleteIndex, 1)
    
    fs.writeFile("../Develop/db/db.json", JSON.stringify(dbjson, null, 4), (err)=>{
        if (err) throw err
       })

    console.log("Note Deleted")
    res.send(dbjson)
})

module.exports = router