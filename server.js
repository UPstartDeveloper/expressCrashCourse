const path = require('path');
// import our logger middleware
const logger = require('./middleware/logger');
// Basic Server Syntax in Express
const express = require('express');
const app = express();
// import Handlebars
const exphbs = require('express-handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Route for index page
app.get('/', (req, res) => res.render('index'));

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/*
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
*/

// Integrate API: Members routes
app.use('/api/members', require('./routes/api/members'));

// give it a PORT to listen to
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
