import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/get-ideas', async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a creative assistant generating fun, original surprise ideas.' },
        { role: 'user', content: `Generate 5 fun and creative surprise ideas for: ${prompt}` }
      ]
    });

    const raw = completion.choices[0].message.content;
    const ideas = raw.split('\n').filter(line => line.trim()).map(line => line.replace(/^\d+\.\s*/, ''));

    res.json({ ideas });
  } catch (err) {
    console.error('❌ OpenAI Error:', err);
    res.status(500).json({ error: 'Failed to generate ideas.' });
  }
});

export default router;
