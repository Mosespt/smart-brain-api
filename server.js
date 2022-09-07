const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin.js');
const register = require('./controllers/register.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		port : 5432,
		user : 'postgres',
		password : 'moses',
		database : 'smartbraindb'
	}
});

// console.log(db.select('*')
//   .from('users'));
/*
db.select('*')
	.from('users')
	.then(data => {
		console.log(data);
	});
*/

const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.get('', (req, res) => {
	res.send('success');
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

app.listen(process.env.PORT || 3001, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})

/**
 * 
 * --> res = 'This is working'
 * /signIn route --> POST request with success/fail response
 * /register --> POST request for new user
 * /profile/:userId --> GET = user
 * /image --> PUT = user update
 * 
 * */