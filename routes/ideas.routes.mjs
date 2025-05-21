import { Router } from 'express';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/get-ideas', async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a creative assistant generating fun, original surprise ideas.'
        },
        {
          role: 'user',
          content: `Give me 5 surprise ideas for: ${prompt}`
        }
      ],
      temperature: 0.9
    });

    const ideasText = completion.choices[0].message.content;
    const ideas = ideasText
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, '').trim());

    res.json({
      promptReceived: prompt,
      message: 'Test successful',
      ideas
    });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to generate ideas', details: error.message });
  }
});

export default router;
