const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ideaRoutes = require('./routes/ideas.routes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Surprise Ideas API Root'));
app.get('/health', (req, res) => res.send({ status: 'OK' }));

app.use('/api', ideaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
