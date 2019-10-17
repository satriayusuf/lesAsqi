var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tugas', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
// var Schema = mongoose.Schema;
// var kamarSchema = new Schema({
// 	nomor: String,
// 	namakamar: String,
// 	jumlahtempattidur: String,
// 	harga: String
// }, {collection : 'kamar'});

// var kamarData = mongoose.model('kamarData', kamarSchema);

const connection = mongoose.connection;
connection.once('open', function () {
	console.log("MongoDB database connection established succesfully");

});

const User = mongoose.model('users', {
	email: String,
	password: String
});
// const Kamar = mongoose.model('kamar', {
// 	nomor: String,
// 	lantai: String,
// 	fasilitas: [String]
// });

/* GET home page. */
router.get('/', function (req, res, next) {
	let data = {
		layout: 'frontend',
		title: 'HardRock',

	};
	res.render('index', data);
});

router.get('/login', function (req, res, next) {

	res.render('login');
});

router.post('/login', function (req, res, next) {
	let data = req.body;

	User.find({
		email: data.email
	}, function (err, docs) {
		if (docs[0].password === data.password) {
			res.redirect('/admin');
		} else {
			res.redirect('/login');
		}
	});
});

router.get('/init_user', function (req, res, next) {
	let user = new User({
		email: 'admin@gmail.com',
		password: '123456'
	});
	user.save().then((resData) => {
		res.send('Init User berhasil');
	});
});

// router.get('/admin/kamar/ubah', function(req, res, next){
// 	res.render('ubah');
// });

// router.post('/admin', function(req, res, next){
// 	res.render('test');
// });
router.get('/kamar', function (req, res, next) {
	kamarData.find()
		.then(function (doc) {
			res.render('index', {
				items: doc
			});
		});

});
router.get('/admin/infohotel', function (req, res, next) {
	res.render('infohotel');
});
// router.get('/kamar', function(req, res, next) {
// 	 Kamar.find((err, kamar) => {
// 		res.status(200).send(kamar);
// 	})
// });

router.get('/kamar/add', function (req, res, next) {
	let kamar = new Kamar({
		nomor: "01",
		namakamar: yqwgyuq,
		jumlahtempattidur: 3,
		harga: 10000
	});
	kamar.save();
	res.status(200).send(kamar);


});

module.exports = router;