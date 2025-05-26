import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailRoutes from './routes/email.routes.js';
import ideasRoutes from './routes/ideas.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api', emailRoutes);
app.use('/api', ideasRoutes);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
