import express from "express";
import { rateLimit } from 'express-rate-limit';
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per IP
});

app.use(rateLimiter);
app.use(cors());
app.use(bodyParser.json()); // Use bodyParser.json() instead of bodyParser.json({ extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// Write your routes here

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3001; // Use process.env.PORT for dynamic port binding
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
