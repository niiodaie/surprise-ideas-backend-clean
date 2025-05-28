const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/get-ideas", (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  // Dummy ideas
  const ideas = [
    `${prompt} idea 1`,
    `${prompt} idea 2`,
    `${prompt} idea 3`
  ];

  res.json({ ideas });
});

app.post("/api/send-email", (req, res) => {
  const { email, ideas } = req.body;
  if (!email || !ideas) {
    return res.status(400).json({ error: "Email and ideas are required." });
  }

  console.log(`Email would be sent to ${email} with ideas:`, ideas);
  res.json({ success: true });
});

app.listen(5051, () => {
  console.log("Backend running on port 5051");
});