let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quiz_2_kapal',
});
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log('Berhasil terhubung ke database');
  }
});

module.exports = connection;
