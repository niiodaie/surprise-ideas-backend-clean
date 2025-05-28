import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
  const ideas = [
    `🎁 Plan a surprise dinner for "${prompt}"`,
    `🎉 Host a themed party: ${prompt}`,
    `📦 Send a mystery gift box for: ${prompt}`,
  ];
  res.json({ ideas });
});

export default router;
