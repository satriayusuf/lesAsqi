var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	let data ={
		layout: 'admin',
		title: 'HardRock',
		content: 'SELAMAT DATANG SATRIA',
	};
  res.render('admin', data);
});

module.exports = router;