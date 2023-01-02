const {Client} = require('pg')

const client = new Client({
    host: "94.130.34.104",
    user: "postgres",
    port: "5052",
    password: "securedaccess",
    database: "practice_1"

}) 
client.connect(async function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
//   client.connect();
module.exports = client;

