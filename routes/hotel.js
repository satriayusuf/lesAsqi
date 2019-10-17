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

const Info = mongoose.model('info', {
    nama: String,
    alamat: String
});

router.get('/', function (req, res, next) {
    Info.find((err, resData) => {
        let data = {
            layout: 'admin',
            title: 'Info Hotel',
            info: resData
        };
        console.log(resData);
        res.render('infohotel', data);
    });
});

router.get('/ubah/:id', function (req, res, next) {
    Info.findById(req.params.id, (err, resData) => {
        let data = {
            layout: 'admin',
            title: 'Info Hotel',
            info: resData
        };
        res.render('infohotel/ubah', data);
    });
});

router.get('/tambah', function (req, res, next) {

    let data = {
        layout: 'admin',
        title: 'Tambah Hotel',

    };
    res.render('infohotel/tambah', data);
});

router.post('/tambah', function (req, res, next) {
    let dataInfo = req.body;
    let info = new Info(dataInfo);
    info.save().then(resData => {
        res.redirect('/admin/hotel');
    }).catch(err => {
        res.status(400).send('Simpan kelas gagal!');
    });
});

router.post('/:id/berhasil', function (req, res, next) {
    let dataInfo = req.body;
    Info.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.nama = dataInfo.nama;
            resData.alamat = dataInfo.alamat;
            resData.save().then(resData => {
                res.redirect('/admin/hotel');
            })
        }
    });
});


module.exports = router;