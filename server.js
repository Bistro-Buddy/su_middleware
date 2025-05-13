const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // allow all origins
app.use(express.json()); // parse JSON bodies

app.post('/proxy', async (req, res) => {
  try {
    const response = await fetch('http://65.0.217.228/validateAndSaveApplicantUserRegistrationData.json', {
      method: 'POST',
      headers: {
        'Authorization': '123456',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy server failed' });
  }
});

app.get('/', (req, res) => {
  res.send('Proxy server is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
