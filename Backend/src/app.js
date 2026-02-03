const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))
// post /api/notes
// create new notes and save data in mongodb
// req.body = {title,description}

app.post('/api/notes',async (req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"note created Successfully",
        note
    })
})

// GET /api/notes
// Fetch all the notes data from mongodb and send them to response

app.get("/api/notes",async (req,res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        message:"Notes Fetches Successfully",
        notes
    })
})

// DELETE /api/notes/:id
// delete note with the id from req.paras

app.delete('/api/notes/:id',async(req,res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully."
    })
})

// Patch /api/notes/:id
// update the description of the note
// req.body = {description}

app.patch('/api/notes/:id',async (req,res)=>{
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"Note Update successfully"
    })
})

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})


module.exports = app