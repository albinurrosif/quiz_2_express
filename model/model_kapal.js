const connection = require('../config/database.js');

class Model_kapal {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM kapal k left join dpi d ' +
          ' on d.id_dpi = k.id_dpi ' +
          ' left join pemilik p ' +
          ' ON p.id_pemilik = k.id_pemilik ' +
          ' left join alat_tangkap a ' +
          ' ON a.id_alat_tangkap = k.id_alat_tangkap ' +
          ' ORDER BY k.id_kapal desc',
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async Store(Data) {
    return new Promise((resolve, reject) => {
      connection.query('insert into kapal set ?', Data, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getId(id) {
    return new Promise((resolve, reject) => {
      connection.query('select * from kapal where id_kapal = ' + id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async Update(id, Data) {
    return new Promise((resolve, reject) => {
      connection.query('update kapal set ? where id_kapal = ' + id, Data, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async Delete(id) {
    return new Promise((resolve, reject) => {
      connection.query('delete from kapal where id_kapal = ' + id, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Model_kapal;
