const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

let users = [
  { id: 1, name: 'User 1', email: 'user1@example.com' },
  { id: 2, name: 'User 2', email: 'user2@example.com' },
];

app.get('/health', (req, res) => res.send('OK'));

// CRUD
app.get('/users', (req, res) => res.json(users));

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});

app.post('/users', (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== Number(req.params.id));
  res.json({ message: 'User deleted' });
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
