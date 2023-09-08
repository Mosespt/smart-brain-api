const express = require('express');
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
<<<<<<< HEAD
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		}
=======
		host : '127.0.0.1',
		port : 0000,	// Your Postgres PORT
		user : 'USER',	// Your Postgres USER
		password : 'PASSWORD',	// Your Postgres USER PASSWORD
		database : 'YOUR DATABASE'
>>>>>>> d8f1fa469cb0e8b29787cae3a3c169ff7cf43450
	}
});


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.get('', (req, res) => {
	res.send(`It's working...`);
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
