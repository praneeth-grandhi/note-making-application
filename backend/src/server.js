import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import notesRoutes from './notes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
if(process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: 'http://localhost:5173' // Adjust this to your frontend URL
    }));
}
app.use(express.json()); //Middleware to parse JSON bodies
app.use(rateLimiter);
// app.use((req, res, next)=> {
//     console.log(req.path, req.method, req.url);
//     next();
// }) // Custom middleware for logging requests

app.use("/api/notes", notesRoutes);


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    })
}

connectDB().then(()=>{
    app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`);
    });
});
