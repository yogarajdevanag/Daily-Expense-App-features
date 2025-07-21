const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;

let expenses = [];

app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false
}));

const USERS = [{ username: 'admin', password: 'admin123' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.get('/check-auth', (req, res) => {
  res.json({ loggedIn: !!req.session.user });
});

app.post('/expenses', (req, res) => {
  if (!req.session.user) return res.status(401).send('Unauthorized');
  const { amount, description, category } = req.body;
  const expense = { id: Date.now(), amount, description, category };
  expenses.push(expense);
  res.json(expense);
});

app.get('/expenses', (req, res) => {
  if (!req.session.user) return res.status(401).send('Unauthorized');
  res.json(expenses);
});

app.delete('/expenses/:id', (req, res) => {
  if (!req.session.user) return res.status(401).send('Unauthorized');
  expenses = expenses.filter(e => e.id != req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
