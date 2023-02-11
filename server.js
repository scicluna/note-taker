const express = require("express")
const app = express()
const notes = require("./routes/notes")
const apinotes = require("./routes/apinotes")
const PORT = process.env.PORT || 3001;

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.render("index")
})

app.use("/notes", notes)
app.use("/api", apinotes)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);