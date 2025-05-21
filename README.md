# Surprise Ideas Backend

This is a working backend for generating surprise ideas using OpenAI and Express.

## How to Use

1. Set your `OPENAI_API_KEY` in a `.env` file.
2. Run the server:
   ```bash
   npm install
   npm start
   ```

3. Test the API:
   - POST `/api/get-ideas` with `{ "prompt": "a birthday surprise" }`