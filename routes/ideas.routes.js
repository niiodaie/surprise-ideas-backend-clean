const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/get-ideas', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a creative assistant generating fun, original surprise ideas.' },
        { role: 'user', content: `Give me 5 surprise ideas for: ${prompt}` }
      ],
      temperature: 0.9,
    });

    const ideasText = completion.data.choices[0].message.content;
    const ideas = ideasText.split('\n').filter(line => line.trim()).map(line => line.replace(/^\d+\.\s*/, '').trim());

    res.json({ promptReceived: prompt, message: 'Success', ideas });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to generate ideas', details: error.message });
  }
});

module.exports = router;