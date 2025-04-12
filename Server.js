import { connectDB } from './config/db.js';
import express from 'express';
import usersRoutes from './routes/usersRoutes.js';
import dotenv from 'dotenv';
// Load environment variables from .env file
const app = express();
app.use(express.json());

dotenv.config();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('/api/auth', usersRoutes);



connectDB().then(() => app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
)
