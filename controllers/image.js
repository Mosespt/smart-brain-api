const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
<<<<<<< HEAD
 apiKey: process.env.API_CLARIFAI
=======
 apiKey: 'YOUR API KEY HERE'
>>>>>>> d8f1fa469cb0e8b29787cae3a3c169ff7cf43450
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to work with API'));
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('Unable to get entries'));
}


module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};
