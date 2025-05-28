import express from 'express';
import { Resend } from 'resend';
const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { email, ideas } = req.body;
  if (!email || !ideas) return res.status(400).json({ error: 'Missing data' });

  try {
    await resend.emails.send({
      from: 'Surprise Ideas <onboarding@resend.dev>',
      to: email,
      subject: 'Your Surprise Ideas',
      html: `<p>Here are your surprise ideas:</p><ul>${ideas.map(i => `<li>${i}</li>`).join('')}</ul>`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
