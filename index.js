const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ideaRoutes = require('./routes/ideas.routes');

dotenv.config();
const app = express();

// ✅ Define allowed frontend origin (update with your real Vercel frontend URL)
const allowedOrigins = [
  'https://surprise-ideas-opr7yf5ke-visnecs-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  }
}));

// ✅ Enable preflight support
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => res.send('Surprise Ideas API Root'));
app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.use('/api', ideaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
