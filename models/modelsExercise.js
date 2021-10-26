const conect =  require('./connection');

const increment = async (id, quantity) => {
  const db = await conect();
  const result = db.collection('exercise').updateOne(
    {_id: id},
    {$inc: quantity}
    );
  return result;
};

module.exports = {
  increment,
};
