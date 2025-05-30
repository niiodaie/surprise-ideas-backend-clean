import express from 'express';
import cors from 'cors';
import ideasRoutes from './routes/ideas.routes.js';
import emailRoutes from './routes/email.routes.js';
import tagsRoutes from './routes/tags.routes.js'; // 🆕 Add this line

const app = express();
app.use(cors());
app.use(express.json());

// Route endpoints
app.use('/api/ideas', ideasRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/tags', tagsRoutes); // 🆕 Add this line

const PORT = process.env.PORT || 5051;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
