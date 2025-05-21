import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ideaRoutes from './routes/ideas.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Surprise Ideas API Root'));
app.get('/health', (req, res) => res.send({ status: 'OK' }));

app.use('/api', ideaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
