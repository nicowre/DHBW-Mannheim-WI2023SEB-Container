const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// In-memory-Datenbank
let products = [
  { id: 1, name: 'Product 1', price: 10.0 },
  { id: 2, name: 'Product 2', price: 20.0 },
];

// Health-Check
app.get('/health', (req, res) => res.send('OK'));

// CRUD
app.get('/products', (req, res) => res.json(products));

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
});

app.post('/products', (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (product) {
    Object.assign(product, req.body);
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/products/:id', (req, res) => {
  products = products.filter(p => p.id !== Number(req.params.id));
  res.json({ message: 'Product deleted' });
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
