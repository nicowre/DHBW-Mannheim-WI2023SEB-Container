const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Ursprüngliche Endpoints
app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

app.get('/health', (req, res) => {
  res.send('healthy');
});

app.post('/data', (req, res) => {
  res.json({ received: req.body });
});

app.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});