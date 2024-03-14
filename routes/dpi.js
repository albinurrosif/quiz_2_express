var express = require('express');
var router = express.Router();
// var connection = require("../config/db.js");
const e = require('method-override');
const model_dpi = require('../model/model_dpi.js');

router.get('/', async function (req, res, next) {
  let rows = await model_dpi.getALL();
  res.render('dpi/index', {
    data: rows,
  });
});

router.get('/create', function (req, res, next) {
  res.render('dpi/create', {
    nama_dpi: '',
  });
});

router.post('/store', async function (req, res, next) {
  try {
    let { nama_dpi } = req.body;
    let { luas } = req.body;

    let Data = {
      nama_dpi,
      luas,
    };
    await model_dpi.Store(Data);
    req.flash('success', 'Berhasil memperbarui data!');
    res.redirect('/dpi');
  } catch {
    res.redirect('/dpi');
  }
});

router.get('/edit/(:id)', async function (req, res, next) {
  let id = req.params.id;
  let rows = await model_dpi.getId(id);
  res.render('dpi/edit', {
    id: rows[0].id_dpi,
    nama_dpi: rows[0].nama_dpi,
    luas: rows[0].luas,
  });
});

router.post('/update/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_dpi } = req.body;
    let { luas } = req.body;

    let Data = {
      nama_dpi,
      luas,
    };
    await model_dpi.update(id, Data);
    req.flash('success', 'Berhasil memperbarui data!');
    res.redirect('/dpi');
  } catch {
    res.redirect('/dpi');
  }
});

router.get('/delete/:id', async function (req, res) {
  let id = req.params.id;
  await model_dpi.delete(id);

  res.redirect('/dpi');
});
module.exports = router;
