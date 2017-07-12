const express = require('express');
const bases = require('bases');
const Pool = require('pg').Pool;
const app = express();

const pgConfig = {
    host: process.env.PG_HOST,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
};

const pool = new Pool(pgConfig);
let client;

async function connectToDatabase() {
    try {
        client = await pool.connect();
    } catch (err) {
        console.log('Error getting connection', err);
    }
}

connectToDatabase();

app.listen(3000, function() {
    console.log('Listening on port 3000');
});

app.get('/:base36', async function(req, res) {
    const id = bases.fromBase36(req.params.base36);

    try {
        const result = await client.query(`SELECT url FROM lessn_urls WHERE id = $1`, [id]);
        res.redirect(301, result.rows[0].url);
    } catch (err) {
        res.status(404).send('Not found');
    }
});
