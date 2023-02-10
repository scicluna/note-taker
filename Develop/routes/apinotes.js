const express = require("express")
const router = express.Router()
const dbjson = require("../db/db.json")

router.get('/notes', (req, res) => {
    res.json(dbjson)
})

module.exports = router