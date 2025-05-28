import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });

  // Mocked AI response
  const ideas = [
    `🎉 Surprise: ${prompt} with a personalized video message.`,
    `🎁 Gift Idea: A custom box of treats for someone who enjoys ${prompt}.`,
    `🌟 Activity: Organize a ${prompt}-themed scavenger hunt.`
  ];

  res.json({ ideas });
});

export default router;
