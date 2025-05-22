import express from 'express';
import { Resend } from 'resend';

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/send-email', async (req, res) => {
  const { email, ideas } = req.body;

  if (!email || !ideas || !Array.isArray(ideas)) {
    return res.status(400).json({ error: 'Invalid request format' });
  }

  try {
    const formattedIdeas = ideas.map((idea, i) => `${i + 1}. ${idea}`).join('<br>');
    const response = await resend.emails.send({
      from: 'SurpriseIdeas@visnec.ai',
      to: email,
      subject: 'Your Surprise Ideas ✨',
      html: `<p>Here are your surprise ideas:</p><p>${formattedIdeas}</p>`
    });

    console.log('📧 Email sent:', response);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Email sending failed:', err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

export default router;
