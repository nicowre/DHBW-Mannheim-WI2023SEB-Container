const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Health-Check
app.get('/health', (req, res) => res.send('OK'));

// Proxy-Helper
const proxyRequest = (res, method, url, data = null) => {
  axios({ method, url, data })
    .then(response => res.json(response.data))
    .catch(error => {
      const status = error.response?.status || 500;
      res.status(status).json({ error: error.message });
    });
};

// Nur die Endpoints, die auch im Backend existieren
app.get('/', (req, res) => proxyRequest(res, 'get', 'http://localhost:3000/'));
app.post('/data', (req, res) => proxyRequest(res, 'post', 'http://localhost:3000/data', req.body));

app.listen(PORT, () => {
  console.log(`API Gateway läuft auf Port ${PORT}`);
});
