var connection = require('../config/database.js');

class model_produk {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('select * from produk a left join kategori b  ' + '  on b.id_kategori=a.id_kategori ' + ' order by a.id_produk desc', function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async Store(Data) {
    return new Promise((resolve, reject) => {
      connection.query('insert into produk set ?', Data, function (err, result) {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getId(id) {
    return new Promise((resolve, reject) => {
      connection.query('select * from produk a left join kategori b ' + ' on b.id_kategori=a.id_kategori ' + ' where a.id_produk = ' + id, (err, rows) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('update produk set ? where id_produk =' + id, data, function (err, result) {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async delete(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('delete from produk where id_produk =' + id, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = model_produk;
