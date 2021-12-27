const qr = require('qr-image');
const fs = require('fs');
const path = require('path');

exports.generateQrCode = (urlString) => {
	try {
		const qrImg = qr.imageSync(urlString, { ec_level: 'H' });

		fs.writeFile(path.join(__dirname, '/../images/qr_code.png'), qrImg, (err) => {
			if (err) throw err;
			console.log('file created');
		});
	}
	catch (error) {
		console.error('Something went wrong trying to generate a qr code', error);
	}
};