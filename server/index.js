require('dotenv').config();
const express = require('express');
const cors = require('cors');
const controllers = require('./controllers/controllerIndex.js');
const models = require('./models/modelIndex.js');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`LISTENING ON PORT ${PORT}`);

// ROUTES - PRODUCT
// app.get('/products/:productId', (req, res) => {
//   controllers.products.getProduct(req, res);
// });

// ROUTES - RATINGS
app.get('/reviews', (req, res) => {
  reviewsCtrl.getReviews(req, res)
})

// ROUTES - QNA
app.get('/qa/questions', (req, res) => {
  models.qna.getQuestions(req, res)});

app.get('/qa/answers', (req, res) => {
  models.qna.getAnswers(req, res)});

app.post('/qa/questions', (req, res) => {
  models.qna.addQuestion(req, res)});

app.post('/qa/answers', (req, res) => {
  models.qna.addAnswer(req, res)});

app.put('/qa/questions/helpful', (req, res) => {
  models.qna.helpful(req, res)});

app.put('/qa/answers/helpful', (req, res) => {
  models.qna.helpful(req, res)});

app.put('/qa/answers/report', (req, res) => {
  models.qna.report(req, res)});