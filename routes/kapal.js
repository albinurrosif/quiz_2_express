const express = require('express');
const router = express.Router();
const model_kapal = require('../model/model_kapal.js');
const model_alat_tangkap = require('../model/model_alat_tangkap.js');
const model_dpi = require('../model/model_dpi.js');
const model_pemilik = require('../model/model_pemilik.js');

router.get('/', async function (req, res, next) {
  let rows = await model_dpi.getAll();
  res.render('kapal/index', {
    data: rows,
  });
});

router.get('/create', async function (req, res, next) {
  try {
    let dataPemilik = await model_pemilik.getAll();
    let dataDpi = await model_dpi.getAll();
    let dataAlatTangkap = await model_alat_tangkap.getAll();
    res.render('kapal/create', {
      id_pemilik: '',
      id_dpi: '',
      id_alat_tangkap: '',
      nama_kapal: '',
      dataPemilik: dataPemilik,
      dataDpi: dataDpi,
      dataAlatTangkap: dataAlatTangkap,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/store', async function (req, res, next) {
  try {
    let data = {
      id_pemilik: req.body.id_pemilik,
      id_dpi: req.body.id_dpi,
      id_alat_tangkap: req.body.id_alat_tangkap,
      nama_kapal: req.body.nama_kapal,
    };
    await model_kapal.Store(data);
    req.flash('success', 'Kapal created successfully');
    res.redirect('/kapal');
  } catch (error) {
    console.error(error);
    res.redirect('/kapal');
  }
});

router.get('/edit/:id', async function (req, res, next) {
  try {
    let dataPemilik = await model_pemilik.getAll();
    let dataDpi = await model_dpi.getAll();
    let dataAlatTangkap = await model_alat_tangkap.getAll();

    const id = req.params.id;
    const kapal = await model_kapal.getId(id);

    if (!kapal || kapal.length === 0) {
      return res.status(404).send('Kapal data not found');
    }

    res.render('kapal/edit', {
      id: id,
      id_pemilik: kapal[0].id_pemilik,
      id_dpi: kapal[0].id_dpi,
      id_alat_tangkap: kapal[0].id_alat_tangkap,
      nama_kapal: kapal[0].nama_kapal,
      dataPemilik: dataPemilik,
      dataDpi: dataDpi,
      dataAlatTangkap: dataAlatTangkap,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/update/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    let data = {
      id_pemilik: req.body.id_pemilik,
      id_dpi: req.body.id_dpi,
      id_alat_tangkap: req.body.id_alat_tangkap,
      nama_kapal: req.body.nama_kapal,
    };
    await model_kapal.Update(id, data);
    req.flash('success', 'Kapal updated successfully');
    res.redirect('/kapal');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to update kapal');
    res.redirect('/kapal');
  }
});

router.get('/delete/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    await model_kapal.Delete(id);
    req.flash('success', 'Kapal deleted successfully');
    res.redirect('/kapal');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to delete kapal');
    res.redirect('/kapal');
  }
});

module.exports = router;
