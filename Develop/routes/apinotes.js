const express = require("express")
const router = express.Router()
let dbjson = require("../db/db.json")
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

//get dbjson
router.get('/notes', (req, res) => { 
    res.json(dbjson)
})

//post notes and append them to the db file
router.post('/notes', (req, res) => {

    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    }
    const newDb = [newNote, ...dbjson]

    fs.writeFile("../Develop/db/db.json", JSON.stringify(newDb, null, 4), (err)=>{
        if (err) throw err
       })

    dbjson = newDb

    console.log("Post Added")
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

    console.log("Post Deleted")
    res.send("Note Deleted")
})

module.exports = router