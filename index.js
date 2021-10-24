require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = process.env;

const middlewares = require('./middlewares');

const app = express();

const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer, {
  cors: {
    origin:'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const names = [];
const post = (req, res) => {
  const {message} = req.body;
  names.push(message);
  io.emit('notification', message)
  io.emit('event', names);
  res.status(200).json({ message: 'Post sucesefuld!' });
};

const front = (_req, res) => {
  return res.render('home', {
    names,
    message: 'minha primeira view',
  });
};

app.post('/ping', post);
app.get('/home', front);

app.use(middlewares.error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

socketServer.listen(4555, () => {
  console.log('socket ta on')
})
