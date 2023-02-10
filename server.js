const express = require("express")
const app = express()
const notes = require("./routes/notes")
const notesapi = require("./routes/apinotes")
const PORT = 3001

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.render("index")
})

app.use("/notes", notes)
app.use("/api", notesapi)


app.listen(PORT)