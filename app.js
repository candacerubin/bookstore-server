require('dotenv').config();
// packages
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js');

const connect = mongoose.connect(MONGODB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// routes
const productRouter = require('./routes/productRouter.js');

const app = express();

const PORT = process.env.port || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'views')));
// passing json parser
app.use(express.json());

app.get('/', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.sendFile(express.static(path.join(app.get('views'), 'index.html')));
});

app.use('/products', productRouter);

connect
	.then(() => {
		console.log('MONGO DB ::: Connected!');
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log(`listening on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.log('DATABASE DID NOT CONNECT CORRECTLY');
		console.log('ERROR :::', err);
	});
