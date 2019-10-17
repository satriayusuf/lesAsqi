var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tugas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB SUKSES");
});



const Nyoba = mongoose.model('nyoba', {
    nomor: String,
    namakamar: String,
    fasilitas: String,
    harga: String
});

router.get('/', function (req, res, next) {
    Nyoba.find((err, resData) => {
        let data = {
            layout: 'admin',
            title: 'Kelola Kamar',
            nyoba: resData
        };
        console.log(resData);
        res.render('kamar', data);
    });
});

router.get('/tambah', function (req, res, next) {

    let data = {
        layout: 'admin',
        title: 'Tambah Kamar',

    };
    res.render('kamar/tambah', data);
});

router.post('/tambah', function (req, res, next) {
    let dataNyoba = req.body;
    let nyoba = new Nyoba(dataNyoba);
    nyoba.save().then(resData => {
        res.redirect('/admin/kamar');
    }).catch(err => {
        res.status(400).send('Simpan kelas gagal!');
    });
});


router.get('/:id/delete', function (req, res, next) {
    Nyoba.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.delete().then(resData => {
                res.redirect('/admin/kamar');
            })
        }
    });
});

router.get('/ubah/:id', function (req, res, next) {
    Nyoba.findById(req.params.id, (err, resData) => {
        let data = {
            layout: 'admin',
            title: 'Daftar Kelas',
            nyoba: resData
        };
        res.render('kamar/ubah', data);
    });
});

router.post('/:id/berhasil', function (req, res, next) {
    let dataNyoba = req.body;
    Nyoba.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.nomor = dataNyoba.nomor;
            resData.namakamar = dataNyoba.namakamar;
            resData.fasilitas = dataNyoba.fasilitas
            resData.harga = dataNyoba.harga;
            resData.save().then(resData => {
                res.redirect('/admin/kamar');
            })
        }
    });
});

module.exports = router;