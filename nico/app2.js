const express = require('express');
const app = express();
const port = 3003;

app.use(express.json());

// Ursprüngliche Endpoints
app.get('/hello', (req, res) => {
  res.send('Hello from Backend!');
});

app.get('/health', (req, res) => {
  res.send('healthy');
});

app.listen(port, () => {
  console.log(`Backend 2 läuft auf http://localhost:${port}`);
});