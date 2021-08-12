const {Client} = require('pq')
const client = new Client({
  user: 'root',
  password: '',
  database: 'qa'
});

client.connect();

client.query('SELECT * FROM PHOTOS', (err, res) => {
  console.log(err, res)
})

module.exports = client;