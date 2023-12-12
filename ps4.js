const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// PokeAPI endpoint
const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

// Route for handling Promise-based requests
router.post('/promise', (req, res) => {
    const pokemon = req.body.pokemon;
    fetch(`${apiEndpoint}${pokemon}`)
        .then(response => response.json())
        .then(data => res.render('display', { data }))
        .catch(err => res.status(500).send(err.message));
});

// Route for handling Async/Await requests
router.post('/async', async (req, res) => {
    try {
        const pokemon = req.body.pokemon;
        const response = await fetch(`${apiEndpoint}${pokemon}`);
        const data = await response.json();
        res.render('display', { data });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route for handling Callback-based requests
router.post('/callback', (req, res) => {
    const pokemon = req.body.pokemon;
    fetch(`${apiEndpoint}${pokemon}`)
        .then(response => response.json())
        .then(data => res.render('display', { data }))
        .catch(err => res.status(500).send(err.message));
});

module.exports = router;
