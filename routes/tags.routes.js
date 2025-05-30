import express from 'express';

const router = express.Router();

// Sample dynamic tags (replace with DB or external fetch later)
const availableTags = [
  "Birthday",
  "Romantic",
  "Holiday",
  "Wedding",
  "Travel",
  "Gift",
  "Funny",
  "Adventure",
  "Virtual",
  "Home"
];

router.get('/tags', (req, res) => {
  res.json({ tags: availableTags });
});

export default router;
