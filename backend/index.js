// This file is located at backend/index.js

const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Vercel handles CORS and routing, so the express cors middleware is not needed here
app.use(express.json());

// In-memory store for registrations.
// NOTE: This data will be cleared on each Vercel deployment/re-run.
// For a production app, you would use a persistent database like Firestore.
const registrations = [];

// API endpoint to handle new registrations
app.post('/register', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    // Return a 400 Bad Request error if name or email are missing
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  // Generate a unique pass ID for the registration
  const passId = uuidv4();
  const registration = { name, email, passId };
  
  // Add the new registration to our in-memory store
  registrations.push(registration);

  // Send back the new registration data with a 200 OK status
  res.status(200).json(registration);
});

// IMPORTANT: For Vercel, you must export the app instead of using app.listen().
module.exports = app;
