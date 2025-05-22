// routes/email.routes.js
import express from 'express';
import { Resend } from 'resend';

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/send-email', async (req, res) => {
  const { email, ideas } = req.body;

  if (!email || !ideas || !ideas.length) {
    return res.status(400).json({ success: false, message: 'Missing email or ideas.' });
  }

  const formattedIdeas = ideas.map((idea, i) => `<li>${idea}</li>`).join('');
  const htmlContent = `
    <h2>Your Surprise Ideas</h2>
    <ul>${formattedIdeas}</ul>
    <p>Thanks for using Surprise Ideas Generator!</p>
  `;

  try {
    await resend.emails.send({
      from: 'Surprise Ideas <noreply@resend.visnec.ai>',
      to: email,
      subject: 'Your Surprise Ideas!',
      html: htmlContent,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Email send failed', details: error.message });
  }
});

export default router;
