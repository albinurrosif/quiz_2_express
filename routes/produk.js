var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const model_kategori = require('../model/model_kategori2.js');
const Model_users = require('../model/model_users.js');
const model_produk = require('../model/model_produk.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/upload');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get('/', async function (req, res, next) {
  try {
    let id = req.session.userId;
    let Data = await Model_users.getId(id);
    if (Data.length > 0) {
      let rows = await model_produk.getAll();
      res.render('produk/index', {
        data: rows,
      });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.redirect('/login');
    next(error);
  }
});

router.get('/create', async function (req, res, next) {
  let rows = await model_kategori.getAll();
  res.render('produk/create', {
    data: rows,
  });
});

router.post('/store', upload.single('foto_produk'), async function (req, res, next) {
  try {
    let { nama_produk, harga_produk, id_kategori } = req.body;
    let Data = {
      nama_produk,
      harga_produk,
      id_kategori,
      foto_produk: req.file.filename,
    };
    await model_produk.Store(Data);
    req.flash('succes', 'Berhasil menyimpan data');
    res.redirect('/produk');
  } catch {
    req.flash('error', 'gagal menyimpan data');
    res.redirect('/produk');
  }
});

router.get('/edit/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let kategoriRows = await model_kategori.getAll(); // Ambil semua data kategori
    let rows = await model_produk.getId(id);
    res.render('produk/edit', {
      data: rows,
      kategoriData: kategoriRows, // Kirim data kategori ke template
      id: rows[0].id_produk,
      nama_produk: rows[0].nama_produk,
      harga_produk: rows[0].harga_produk,
      foto_produk: rows[0].foto_produk,
      id_kategori: rows[0].id_kategori,
    });
  } catch (error) {
    res.redirect('/produk');
    console.error(error);
  }
});

router.post('/update/(:id)', upload.single('foto_produk'), async function (req, res, next) {
  let id = req.params.id;
  let filebaru = req.file ? req.file.filename : null;
  let rows = await model_produk.getId(id);
  const namaFileLama = rows[0].foto_produk;

  if (filebaru && namaFileLama) {
    const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
    fs.unlinkSync(pathFileLama);
  }
  let { nama_produk, harga_produk, id_kategori } = req.body;
  let foto_produk = filebaru || namaFileLama;
  let Data = {
    nama_produk,
    harga_produk,
    id_kategori,
    foto_produk,
  };
  model_produk.update(id, Data);
  req.flash('success', 'Berhasil update data');
  res.redirect('/produk');
});

router.get('/delete/(:id)', async function (req, res, next) {
  let id = req.params.id;
  let rows = await model_produk.getId(id);
  const namaFileLama = rows[0].foto_produk;
  if (namaFileLama) {
    const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
    fs.unlinkSync(pathFileLama);
  }
  await model_produk.delete(id);
  req.flash('success', 'Berhasil menghapus data');
  res.redirect('/produk');
});

module.exports = router;
