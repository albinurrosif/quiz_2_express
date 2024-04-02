var express = require('express');
var router = express.Router();

//var connection = require('../config/database.js');
const model_kategori = require('../model/model_kategori2');

router.get('/', async function (req, res, next) {
  let rows = await model_kategori.getAll();
  res.render('kategori/index', {
    data: rows,
  });
});

router.get('/create', function (req, res, next) {
  res.render('kategori/create', {
    nama_kategori: '',
  });
});

router.post('/store', async function (req, res, next) {
  try {
    let { nama_kategori } = req.body;
    let Data = {
      nama_kategori,
    };
    await model_kategori.Store(Data);
    req.flash('success', 'berhasil mneyimpan data');
    res.redirect('/kategori');
  } catch {
    req.flash('error', 'terjadi kesalahan pada fungsi');
    res.redirect('/kategori');
  }
});

router.get('/edit/(:id)', async function (req, res, next) {
  let id = req.params.id;
  let rows = await model_kategori.getId(id);
  res.render('kategori/edit', {
    id: rows[0].id_kategori,
    nama_kategori: rows[0].nama_kategori,
  });
});

router.post('/update/(:id)', async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_kategori } = req.body;
    let data = {
      nama_kategori: nama_kategori,
    };
    let rows = await model_kategori.Update(id, data);
    req.flash('successs', 'berhasil memperbarui data');
    res.redirect('/kategori');
  } catch {
    req.flash('error', 'terjadi kesalahan pada fungsi');
    res.render('/kategori');
  }
});

router.get('/delete/(:id)', async function (req, res) {
  let id = req.params.id;
  await model_kategori.Delete(id);
  req.flash('success', 'data berhasil dihapus');
  res.redirect('/kategori');
});

module.exports = router;
