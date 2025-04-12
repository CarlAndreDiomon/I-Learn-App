import { connectDB } from './config/db.js';
import express from 'express';
import dotenv from 'dotenv';
// Load environment variables from .env file
const app = express();

dotenv.config();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

connectDB().then(() => app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
)
