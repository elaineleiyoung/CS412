const express = require('express');
const bodyParser = require('body-parser');
const ps4Router = require('./ps4');

const app = express();
const port = 3000;

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the PS4 router
app.use('/ps4', ps4Router);

// Root route to render the form
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
