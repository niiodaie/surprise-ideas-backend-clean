import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ideaRoutes from './routes/ideas.routes.js';
import emailRoutes from './routes/email.routes.js'; // <- This is key

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('✅ Surprise Ideas API is live'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', ideaRoutes);
app.use('/api', emailRoutes); // <- Also important

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
