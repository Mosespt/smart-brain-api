const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin.js');
const register = require('./controllers/register.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
	// connect to your own database here:
	client: 'pg',
	connection: {

		connectionString: process.env.DATABASE_URL,
		ssl: true,

	}
});


const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('', (req, res) => {
	res.send("It's working...");
});

app.post('/signin', (req, res) => {
	signin.handleSignIn(req, res, db, bcrypt)
});
app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt)
});
app.get('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, db)
});
app.put('/image', (req, res) => {
	image.handleImage(req, res, db)
});
app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res)
});

app.listen(3001, () => {
	console.log('App is running on port 3001');
})
