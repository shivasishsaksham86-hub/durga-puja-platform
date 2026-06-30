const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Durga Puja Platform Backend API!' });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'Online', timestamp: new Date().toISOString() });
});

// Start Server
app.listen(PORT, () => {
  console.log(Backend server is running on port );
});
