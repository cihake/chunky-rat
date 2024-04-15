/*=============================================================================+
| ♥ APP.JS                                        Copyright (C) 2024 Eva Cihak |
|------------------------------------------------------------------------------|
| This program is free software and can be redistributed and/or adapted under  |
| the terms of the MIT License as published by the Massachusetts Institute of  |
| Technology (MIT). See LECENSE for additional details.                        |
+==============================================================================+
Last edit on 04/15/24
*/

/*=============================================================================+
| MODULES -
+=============================================================================*/

const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

/*=============================================================================+
| DATABASE - MONGODB
+=============================================================================*/

// set up MongoDB connection
const uri = '';// ahhhhh paste in uri later
const client = new MongoClient(uri);

// connect to MongoDB
async function connectToDatabase() {
	try {
		await client.connect();
		console.log('YIPPEE! Connected to MongoDB');
	} catch (error) {
		console.error('UH-OH! Error connecting to MongoDB:', error);
	}
}

connectToDatabase();

/*=============================================================================+
| MIDDLEWARE - EXPRESS.URLENCODED, EXPRESS.STATIC, LOGGER
+=============================================================================*/

// logs info about incoming requests
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // call next middleware function
	next();
}

// register middleware globally
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);

/*=============================================================================+
| TEMPLATE ROUTES - INDEX.JS, ABOUT.JS
+=============================================================================*/

// landing page
app.get('/', (req, res) => {
	const data = {
		pageTitle: 'Home',
		currentDate: new Date().toLocaleDateString(),
		currentYear: new Date().getFullYear()
	};
	res.render('index', data);
});

// about page
app.get('/about', (req, res) => {
	res.render('about');
});

/*============================================================================*/

// set 'views' directory for Express to look for templates
app.set('views', './views');
// set EJS as the view engine
app.set('view engine', 'ejs');

/*=============================================================================+
| START SERVER
+=============================================================================*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`WEW! Server is running on port ${PORT}`);
});