express = require('express');
 
const app = express();
app.get('/buenas', (req, res) => {
    return res.send('Received a GET1 HTTP method');
  });
  app.get('/hola', (req, res) => {
    return res.send('Received a GET2 HTTP method');
  });
   
  app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });
   
  app.put('/add/:id/:nombre/:cantidad', (req, res) => {
    return res.send(req.params);
  });
   
  app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  });
   
  app.listen(9999, () =>
    console.log(`Example app listening on port 9999!`),
  );