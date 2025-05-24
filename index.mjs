import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ideaRoutes from './routes/ideas.routes.js';
// import emailRoutes from './routes/email.routes.js'; // Disabled for now
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health Check & Root
app.get('/', (req, res) => res.send('Surprise Ideas API Root'));
app.get('/health', (req, res) => res.send({ status: 'OK' }));

// Routes
app.use('/api', ideaRoutes);
// app.use('/api', emailRoutes); // Temporarily disabled

// Airtable Resources Route
app.get('/api/resources', async (req, res) => {
  try {
    const token = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = 'Resources';
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!data.records) throw new Error('No records found');
    
    const resources = data.records.map(record => ({
      id: record.id,
      title: record.fields.Title,
      type: record.fields.Type,
      link: record.fields.Link,
      tags: record.fields.Tags || [],
      description: record.fields.Description,
      featured: record.fields.Featured === true,
      status: record.fields.Status,
    }));

    res.json({ success: true, resources });
  } catch (err) {
    console.error('Airtable fetch error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
