const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ideaRoutes = require('./routes/ideas.routes');

dotenv.config();
const app = express();

// ✅ Define your real frontend deployment origin from Vercel
const allowedOrigins = [
  'https://surprise-ideas-opr7yf5ke-visnecs-projects.vercel.app'
];

// ✅ Allow specific frontend origin through CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true
}));

// ✅ Allow preflight (OPTIONS) requests for all routes
app.options('*', cors());

app.use(express.json());

// ✅ Root and health check endpoints
app.get('/', (req, res) => res.send('Surprise Ideas API Root'));
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// ✅ Use idea generation/email routes
app.use('/api', ideaRoutes);

// ✅ Start server on defined PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
