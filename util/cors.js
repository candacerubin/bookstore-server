const cors = require('cors');

const whitelist = ['http://localhost:3001', 'http://localhost:3000'];

const corsOptionsDelegate = (req, callback) => {
	let corsOptions;

	if (
		whitelist.indexOf(req.headers('Origin')) !== -1 ||
		whitelist.indexOf(req.headers.origin) !== -1
	) {
		corsOptions = { origin: true };
	} else {
		corsOptions = { origin: false };
	}
	callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
