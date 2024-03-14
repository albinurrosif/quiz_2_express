/*jshint esversion: 11 */
var express = require('express');
var router = express.Router();
const e = require('method-override');

//var connection = require('../config/database.js');
const Model_pemilik = require('../model/model_pemilik');

router.get('/', async function (req, res, next) {
  let rows = await Model_pemilik.getAll();
  res.render('pemilik/index', {
    data: rows,
  });
});

router.get('/create', function (req, res, next) {
  res.render('pemilik/create', {
    nama_pemilik: '',
    alamat: '',
    no_hp: '',
  });
});

router.post('/store', async function (req, res, next) {
  try {
    //let {nama_kategori} = req.body;
    let data = {
      nama_pemilik: req.body.nama_pemilik,
      alamat: req.body.alamat,
      no_hp: req.body.no_hp,
    };
    await Model_pemilik.Store(data);
    res.redirect('/pemilik');
  } catch {
    res.redirect('/pemilik');
  }
});

router.get('/edit/(:id)', async function (req, res, next) {
  let id = req.params.id;
  let rows = await Model_pemilik.getId(id);
  res.render('pemilik/edit', {
    id,
    nama_pemilik: rows[0].nama_pemilik,
    alamat: rows[0].alamat,
    no_hp: rows[0].no_hp,
  });
});

router.post('/update/(:id)', async function (req, res, next) {
  try {
    let id = req.params.id;
    //  let {nama_kategori} = req.body;
    let data = {
      nama_pemilik: req.body.nama_pemilik,
      alamat: req.body.alamat,
      no_hp: req.body.no_hp,
    };
    let rows = await Model_pemilik.Update(id, data);
    req.flash('successs', 'berhasil memperbarui data');
    res.redirect('/pemilik');
  } catch {
    req.flash('error', 'terjadi kesalahan pada fungsi');
    res.render('/pemilik');
  }
});

router.get('/delete/(:id)', async function (req, res) {
  let id = req.params.id;
  await Model_pemilik.Delete(id);
  req.flash('success', 'data berhasil dihapus');
  res.redirect('/pemilik');
});

module.exports = router;
