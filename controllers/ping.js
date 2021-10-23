const pong = (_req, res) => {
  res.status(200).json({ message: 'Pong!' });
};

const front = (req, res) => {
  res.render('home', { names: ['Bastião', 'Bastiana', 'Bastian'] });
};

module.exports = {
  pong,
  front,
};
