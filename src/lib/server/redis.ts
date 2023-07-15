import { REDIS_CONNECTION } from '$env/static/private';
import { createClient } from 'redis';

export const redisDB = createClient({
    url: REDIS_CONNECTION,
});

redisDB.on("connect", function () {
    console.error("Connected to Redis!");
});

redisDB.on("ready", function () {
    console.error("Redis is ready!");
});

redisDB.on("reconnecting", function () {
    console.error("Redis is reconnecting!");
});

redisDB.on("end", function () {
    console.error("Redis connection has ended!");
});

redisDB.on("error", function (err) {
    console.error(err);
});

await redisDB.connect();
// await redisDB.disconnect(); await redisDB.quit();
