import express from 'express';
import dotenv from 'dotenv';
import ideasRoutes from './routes/ideas.js';
import emailRoutes from './routes/email.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5051;

app.use(express.json());
app.use('/api/get-ideas', ideasRoutes);
app.use('/api/send-email', emailRoutes);

app.get('/', (req, res) => {
  res.send('Surprise Ideas API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
