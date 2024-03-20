const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/protected-text", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const Note = mongoose.model("Note", {
  title: String,
  text: String,
  password: String,
})

app.get("/", (req, res) => {
    res.send("Welcome to Protected Text")
})

app.post("/note", async (req, res) => {
  try {
    const { title, text, password } = req.body
    const note = new Note({ title, text, password })
    await note.save()
    res.status(201).send("Note added successfully")
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

app.post("/note/:password", async (req, res) => {
  try {
    const { password } = req.params
    const { password: reqPassword } = req.body
    const note = await Note.findOne({ password })
    if (!note) {
      return res.status(404).send("Note not found")
    }
    res.json({ title: note.title, text: note.text })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
