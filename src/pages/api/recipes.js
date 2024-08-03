// src/pages/api/recipes.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ingredients } = req.body;

    try {
      const response = await axios.get('https://api.edamam.com/search', {
        params: {
          q: ingredients.join(','),
          app_id: process.env.EDAMAM_APP_ID,
          app_key: process.env.EDAMAM_APP_KEY,
          to: 10,
        },
      });

      res.status(200).json(response.data.hits);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
