const prodCont = require('./controllers/products.js')
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/products', (req, res) => {
  prodCont.getProducts(req, res);
})
app.get('/products/:page&:quantity', (req, res) => {
  prodCont.getProducts(req, res);
})
app.get('/products/:product_id', (req, res) => {
  prodCont.getProduct(req, res);
})
app.get('/products/:product_id/styles', (req, res) => {
  prodCont.getStyle(req, res);
})
app.get('/products/:product_id/related', (req, res) => {
  prodCont.getRelated(req, res);
})


app.listen(8000 , () => {
  console.log('Server listening on 8000');
})
