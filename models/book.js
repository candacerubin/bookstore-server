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
	},
	{
		timestamps: true,
	}
);

module.exports = model('Book', bookSchema);
