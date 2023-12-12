const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('end', () => console.log('Redis client disconnected'));

redisClient.connect();  // Explicitly connect the client

module.exports = redisClient;
