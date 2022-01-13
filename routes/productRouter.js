const express = require('express');
const { Book } = require('../models');
const { jsonRESPONSE } = require('../util/responseHelpers');
const cors = require('../util/cors');

const productRouter = express.Router();

productRouter
	.route('/books')
	.options(cors.cors, (_, res) => res.sendStatus(200))
	.post(cors.corsWithOptions, async (req, res) => {
		const { title, isbn } = req.body;
		// creates new book if title and isbn are provided
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
				error: 'You did not include proper input. Title and ISBN required.',
			});
		}
	})
	.get(cors.cors, async (req, res) => {
		// get all the books in the database and return them
		const books = await Book.find();
		return jsonRESPONSE(200, res, { books, someMsg: `More data can go here` });
	});

productRouter
	.route('/books/:bookId')
	.options(cors.cors, (_, res) => res.sendStatus(200))
	.get(cors.cors, async (req, res) => {
		const { bookId } = req.params;
		if (bookId) {
			const book = await Book.findOne({ _id: bookId });
			return jsonRESPONSE(200, res, { book });
		}
	})
	.put(cors.cors, async (req, res) => {
		const { bookId } = req.params;
		const { title, isbn } = req.body;
		const book = await Book.findByIdAndUpdate(
			bookId,
			{ title: title, isbn: isbn },
			{ new: true }
		);

		book.save().then((updatedBook) => {
			if (updatedBook) {
				return jsonRESPONSE(200, res, { book: updatedBook });
			} else {
				return jsonRESPONSE(200, res, {
					error: 'You did not include proper input. Title and ISBN required.',
				});
			}
		});
	});

module.exports = productRouter;
