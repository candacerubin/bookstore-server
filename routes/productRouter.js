const express = require('express');
const { Book } = require('../models');
const { jsonRESPONSE } = require('../util/responseHelpers');
const cors = require('../util/cors');

const productRouter = express.Router();

productRouter
	.route('/books')
	.get(async (req, res) => {
		// get all the books in the database and return them
		const books = await Book.find();
		return jsonRESPONSE(200, res, { books });
	})
	.post(cors.cors, async (req, res) => {
		const { title, isbn } = req.body;

		if (title && isbn) {
			const newBook = await new Book({ title, isbn });
			newBook
				.save()
				.then((createdBook) => {
					if (createdBook) {
						return jsonRESPONSE(200, res, { createdBook });
					}
				})
				.catch((error) => {
					if (error) {
						return jsonRESPONSE(400, res, { error });
					}
				});
		} else {
			return jsonRESPONSE(200, res, {
				error: 'You did not include proper input.',
			});
		}
	});

productRouter.route('/books/:bookId').get(async (req, res) => {
	const { bookId } = req.params;
	if (bookId) {
		const book = await Book.findOne({ _id: bookId });
		return jsonRESPONSE(200, res, { book });
	}
});

module.exports = productRouter;
