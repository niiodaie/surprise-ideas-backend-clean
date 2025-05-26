import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();
const app = express();
const port = process.env.PORT || 5051;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { email, ideas } = req.body;
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Your Surprise Ideas 🎁',
      html: `<p>Here are your surprise ideas:</p><ul>${ideas.map(i => `<li>${i}</li>`).join('')}</ul>`
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Email failed to send.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
