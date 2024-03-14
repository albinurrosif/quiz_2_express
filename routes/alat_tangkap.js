var express = require('express');
var router = express.Router();
// var connection = require("../config/db.js");
const e = require('method-override');
const model_alat_tangkap = require('../model/model_alat_tangkap.js');

router.get('/', async function (req, res, next) {
  let rows = await model_alat_tangkap.getALL();
  res.render('alat_tangkap/index', {
    data: rows,
  });
});

router.get('/create', function (req, res, next) {
  res.render('alat_tangkap/create', {
    nama_alat_tangkap: '',
  });
});

router.post('/store', async function (req, res, next) {
  try {
    let { nama_alat_tangkap } = req.body;

    let Data = {
      nama_alat_tangkap,
    };
    await model_alat_tangkap.Store(Data);
    req.flash('success', 'Berhasil memperbarui data!');
    res.redirect('/alat_tangkap');
  } catch {
    res.redirect('/alat_tangkap');
  }
});

router.get('/edit/(:id)', async function (req, res, next) {
  let id = req.params.id;
  let rows = await model_alat_tangkap.getId(id);
  res.render('alat_tangkap/edit', {
    id: rows[0].id_alat_tangkap,
    nama_alat_tangkap: rows[0].nama_alat_tangkap,
  });
});

router.post('/update/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_alat_tangkap } = req.body;

    let Data = {
      nama_alat_tangkap,
    };
    await model_alat_tangkap.update(id, Data);
    req.flash('success', 'Berhasil memperbarui data!');
    res.redirect('/alat_tangkap');
  } catch {
    res.redirect('/alat_tangkap');
  }
});

router.get('/delete/:id', async function (req, res) {
  let id = req.params.id;
  await model_alat_tangkap.delete(id);

  res.redirect('/alat_tangkap');
});
module.exports = router;
