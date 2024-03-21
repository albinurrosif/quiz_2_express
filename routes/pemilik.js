/*jshint esversion: 11 */
const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const Model_pemilik = require('../model/model_pemilik');

// Middleware method-override
router.use(methodOverride('_method'));

// Route untuk menampilkan semua data pemilik
router.get('/', async (req, res, next) => {
  try {
    const rows = await Model_pemilik.getAll();
    res.render('pemilik/index', { data: rows });
  } catch (error) {
    next(error); // Meneruskan kesalahan ke middleware penanganan kesalahan
  }
});

// Route untuk menampilkan form tambah pemilik
router.get('/create', (req, res) => {
  res.render('pemilik/create', { nama_pemilik: '', alamat: '', no_hp: '' });
});

// Route untuk menyimpan data pemilik yang baru
router.post('/store', async (req, res, next) => {
  try {
    const data = {
      nama_pemilik: req.body.nama_pemilik,
      alamat: req.body.alamat,
      no_hp: req.body.no_hp,
    };
    await Model_pemilik.Store(data);
    res.redirect('/pemilik');
  } catch (error) {
    next(error); // Meneruskan kesalahan ke middleware penanganan kesalahan
  }
});

// Route untuk menampilkan form edit pemilik
router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const rows = await Model_pemilik.getId(id);
    res.render('pemilik/edit', {
      id,
      nama_pemilik: rows[0].nama_pemilik,
      alamat: rows[0].alamat,
      no_hp: rows[0].no_hp,
    });
  } catch (error) {
    next(error); // Meneruskan kesalahan ke middleware penanganan kesalahan
  }
});

// Route untuk menyimpan perubahan pada data pemilik
router.post('/update/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = {
      nama_pemilik: req.body.nama_pemilik,
      alamat: req.body.alamat,
      no_hp: req.body.no_hp,
    };
    await Model_pemilik.Update(id, data);
    res.redirect('/pemilik');
  } catch (error) {
    next(error); // Meneruskan kesalahan ke middleware penanganan kesalahan
  }
});

// Route untuk menghapus data pemilik
router.get('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Model_pemilik.Delete(id);
    res.redirect('/pemilik');
  } catch (error) {
    next(error); // Meneruskan kesalahan ke middleware penanganan kesalahan
  }
});

module.exports = router;
