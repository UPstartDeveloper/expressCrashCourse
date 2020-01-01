// Basic Server Syntax in Express
const express = require('express');

const app = express();

// route for the root directory
app.get('/', (req, res) => {
    res.send('<h1>Hello Project!</h1>');
})

// give it a PORT to listen to
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
