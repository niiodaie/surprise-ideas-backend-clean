import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ideasRoutes from './routes/ideas.js';
import emailRoutes from './routes/email.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/get-ideas', ideasRoutes);
app.use('/api/send-email', emailRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
