const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/login'))
    .get('/login', (req, res) => res.render('pages/login'))
    .post('/login', async(req, res) => {
        try {
            const client = await pool.connect()
                //const loginQuery = await client.query(`...`);

            //const result = await client.query(``);
            //const results = { 'results': (result) ? result.rows : null };
            //res.render('pages/<pageName>', results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/signup', (req, res) => res.render('pages/signup'))
    .post('/signup', async(req, res) => {
        try {
            const client = await pool.connect()
                //const signupQuery = await client.query(`INSERT INTO users values(${req.body.userid}, ${req.body.password}`);

            //const result = await client.query(`SELECT * FROM users ORDER BY userid `);
            //const results = { 'results': (result) ? result.rows : null };
            //res.render('pages/<pageName>', results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))