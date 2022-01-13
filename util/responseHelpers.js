function jsonRESPONSE(code, res, json) {
	res.statusCode = code;
	res.setHeader('Content-Type', 'application/json');
	// spreading ensures that an object or array is being passed into function
	return res.json({ ...json });
}

module.exports = { jsonRESPONSE };
