const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const redisClient = require('./redisClient');

const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

router.post('/promise', async (req, res) => {
    const pokemon = req.body.pokemon;
    const cacheKey = `pokemon:${pokemon}`;

    try {
        if (!redisClient.isOpen) {
            throw new Error('Redis client not connected');
        }
        // Check Redis cache
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.json({ source: 'cache', data: JSON.parse(cachedData) });
        }

        // Fetch data from API
        const response = await fetch(`${apiEndpoint}${pokemon}`);
        const data = await response.json();

        // Cache the response
        await redisClient.setEx(cacheKey, 15, JSON.stringify(data));  // 15-second timeout

        res.json({ source: 'api', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route for handling Async/Await requests
// Route for handling Async/Await requests
router.post('/async', async (req, res) => {
    const pokemon = req.body.pokemon;
    const cacheKey = `pokemon:async:${pokemon}`;

    try {
        // Check Redis cache
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.json({ source: 'cache', data: JSON.parse(cachedData) });
        }

        // Fetch data from API
        const response = await fetch(`${apiEndpoint}${pokemon}`);
        const data = await response.json();

        // Cache the response
        await redisClient.setEx(cacheKey, 15, JSON.stringify(data));  // 15-second timeout

        res.json({ source: 'api', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route for handling Callback-based requests
router.post('/callback', (req, res) => {
    const pokemon = req.body.pokemon;
    const cacheKey = `pokemon:callback:${pokemon}`;

    redisClient.get(cacheKey)
        .then(cachedData => {
            if (cachedData) {
                return res.json({ source: 'cache', data: JSON.parse(cachedData) });
            } else {
                fetch(`${apiEndpoint}${pokemon}`)
                    .then(response => response.json())
                    .then(data => {
                        redisClient.setEx(cacheKey, 15, JSON.stringify(data));  // Cache the response
                        res.json({ source: 'api', data });
                    })
                    .catch(err => res.status(500).json({ error: err.message }));
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


module.exports = router;
