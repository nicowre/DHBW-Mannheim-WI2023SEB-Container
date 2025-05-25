const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

let orders = [
  { id: 1, productId: 1, userId: 1, quantity: 2 },
  { id: 2, productId: 2, userId: 2, quantity: 1 },
];

app.get('/health', (req, res) => res.send('OK'));

// CRUD
app.get('/orders', (req, res) => res.json(orders));

app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === Number(req.params.id));
  order ? res.json(order) : res.status(404).json({ error: 'Order not found' });
});

app.post('/orders', (req, res) => {
  const newOrder = { id: Date.now(), ...req.body };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.put('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === Number(req.params.id));
  if (order) {
    Object.assign(order, req.body);
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.delete('/orders/:id', (req, res) => {
  orders = orders.filter(o => o.id !== Number(req.params.id));
  res.json({ message: 'Order deleted' });
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
