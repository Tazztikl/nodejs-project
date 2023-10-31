const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

app.get('/api/data', (req, res) => {
  res.json(data);
});

app.post('/api/data', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.json(newItem);
});

app.delete('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = data.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    data.splice(itemIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Resource not found' });
  }
});

app.put('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const itemIndex = data.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    data[itemIndex] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ error: 'Resource not found' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
