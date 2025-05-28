import express from 'express';
import { Resend } from 'resend';

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { email, ideas } = req.body;
  if (!email || !ideas || !Array.isArray(ideas)) {
    return res.status(400).json({ error: 'Email and ideas required' });
  }

  try {
    const html = `<h3>Your Surprise Ideas</h3><ul>${ideas.map(i => `<li>${i}</li>`).join('')}</ul>`;
    const data = await resend.emails.send({
      from: 'Surprise Ideas <noreply@visnec.ai>',
      to: email,
      subject: 'Your Surprise Ideas',
      html,
    });

    res.json({ success: true, id: data.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
