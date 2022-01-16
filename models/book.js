const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		isbn: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		pageCount: {
			type: Number,
			required: true,
		},
		pubYear: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model('Book', bookSchema);
