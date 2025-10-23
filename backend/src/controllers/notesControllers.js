import Note from '../models/NoteModel.js';

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    }catch(err){
        console.log("Failed to fetch notes",err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.log("Failed to fetch note", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNote(req, res) {
    try{
        const { title, content } = req.body;
        const note = new Note({ title, content });
        const savedNote = await note.save();
        res.status(201).json({ message: "Note created successfully", note: savedNote });
    }catch(err){
        console.log("Failed to create note",err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNode = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
        if (!updatedNode) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({updatedNode});
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function deleteNote(req, res) {
    try {
        const deletedNode =await Note.findByIdAndDelete(req.params.id);
        if (!deletedNode) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
