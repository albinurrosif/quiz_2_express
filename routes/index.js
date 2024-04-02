var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Model_users = require('../model/model_users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('users/index', { title: 'Express' });
});

router.get('/register', function (req, res, next) {
  res.render('auth/register');
});

router.get('/login', function (req, res, next) {
  res.render('auth/login');
});

router.post('/saveusers', async (req, res) => {
  let { email, password } = req.body;
  let enkripsi = await bcrypt.hash(password, 10);
  let Data = {
    email,
    password: enkripsi,
  };
  await Model_users.Store(Data);
  res.redirect('/login');
});

router.post('/log', async (req, res) => {
  let { email, password } = req.body;
  try {
    let Data = await Model_users.Login(email);
    if (Data.length > 0) {
      let enkripsi = Data[0].password;
      let cek = await bcrypt.compare(password, enkripsi);
      if (cek) {
        req.session.userId = Data[0].id_users;
        if (Data[0].level_users == 1) {
          req.flash('success', 'Berhasil login');
          res.redirect('/superusers');
        } else if (Data[0].level_users == 2) {
          req.flash('success', 'Berhasil login');
          res.redirect('/users');
        } else {
          res.redirect('/login');
        }
      } else {
        req.flash('error', 'Email atau password salah');
        res.redirect('/login');
      }
    } else {
      req.flash('error', 'Akun tidak ditemukan');
      res.redirect('/login');
    }
  } catch (err) {
    res.redirect('/login');
    req.flash('error', 'Error pada fungsi');
  }
});

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error(err);
    } else {
      res.redirect('login');
    }
  });
});

module.exports = router;
