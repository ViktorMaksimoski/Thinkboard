import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createAt: -1 })
        res.status(200).json(notes);
    } catch(err) {
        console.error("Cannot get all notes ", err);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({ message: "Note not found" })
        res.status(200).json(note)
    } catch(err) {
        console.error("Cannot get the note ", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const newNote = new Note({ title, content })

        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
    } catch(err) {
        console.error("Cannot create note ", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content })
        
        if(!updatedNote) return res.status(404).json({ message: "Note not found" })
        res.status(200).json(updatedNote);
    } catch(err) {
        console.error("Cannot update note ", err);
        res.status(500).json({ message: "Internal server error "});
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote) return res.status(404).json({ message: "Note not found" })
        res.status(200).json(deletedNote);
    } catch(err) {
        console.error("Cannot delete note ", err);
        res.status(500).json({ message: "Internal server error" })
    }
}