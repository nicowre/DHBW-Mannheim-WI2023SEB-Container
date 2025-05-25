const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

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

// CRUD für Products
app.get('/products', (req, res) => proxyRequest(res, 'get', 'http://product-service:3001/products'));
app.get('/products/:id', (req, res) => proxyRequest(res, 'get', `http://product-service:3001/products/${req.params.id}`));
app.post('/products', (req, res) => proxyRequest(res, 'post', 'http://product-service:3001/products', req.body));
app.put('/products/:id', (req, res) => proxyRequest(res, 'put', `http://product-service:3001/products/${req.params.id}`, req.body));
app.delete('/products/:id', (req, res) => proxyRequest(res, 'delete', `http://product-service:3001/products/${req.params.id}`));

// CRUD für Users
app.get('/users', (req, res) => proxyRequest(res, 'get', 'http://user-service:3002/users'));
app.get('/users/:id', (req, res) => proxyRequest(res, 'get', `http://user-service:3002/users/${req.params.id}`));
app.post('/users', (req, res) => proxyRequest(res, 'post', 'http://user-service:3002/users', req.body));
app.put('/users/:id', (req, res) => proxyRequest(res, 'put', `http://user-service:3002/users/${req.params.id}`, req.body));
app.delete('/users/:id', (req, res) => proxyRequest(res, 'delete', `http://user-service:3002/users/${req.params.id}`));

// CRUD für Orders
app.get('/orders', (req, res) => proxyRequest(res, 'get', 'http://order-service:3003/orders'));
app.get('/orders/:id', (req, res) => proxyRequest(res, 'get', `http://order-service:3003/orders/${req.params.id}`));
app.post('/orders', (req, res) => proxyRequest(res, 'post', 'http://order-service:3003/orders', req.body));
app.put('/orders/:id', (req, res) => proxyRequest(res, 'put', `http://order-service:3003/orders/${req.params.id}`, req.body));
app.delete('/orders/:id', (req, res) => proxyRequest(res, 'delete', `http://order-service:3003/orders/${req.params.id}`));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
