const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const ee = require('@google/earthengine');
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});
  
ee.initialize(null, null, 3000);
//unsure if we need to initialize google earth engine without an assocated service account to authorize

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .post('/randMap', (req, res) => {
      //const image = ee.Image()
  
      var image = ee.Image('CGIAR/SRTM90_V4');
      Map.setCenter(-110, 40, 5);
      Map.addLayer(image, {min: 0, max: 3000}, 'SRTM');
      console.log("yett2")  
      res.render('pages/login')  
      
    })
    .get('/', (req, res) => res.render('pages/login'))
    .get('/main', (req, res) => res.render('pages/NotAWebApp'))
    .get('/mainmenu', (req, res) => res.render('pages/mainmenu'))
    .get('/underconstruction', (req, res) => res.render('pages/underconstruction'))
    .get('/login', (req, res) => res.render('pages/login'))
    .post('/login', async(req, res) => {
        try {
          // input sanitation (protection from injection attacks) is beyond the scope of the project because I'm depressed :)))
          console.log("recieved login request with uid", req.body.userid, "password", req.body.password)


          const client = await pool.connect()          
          
          result = await client.query(`SELECT password FROM users WHERE userid = '${req.body.userid}'`);

          const results = { 'results': (result) ? result.rows : null };
          if (result.rows[0].password == req.body.password) {
              res.render('pages/NotAWebApp', results);
              console.log("logged in");
          } else {
              res.render('pages/signup', results);
              console.log("not logged in");
          }
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
            const result = await client.query(`INSERT INTO users (userid, password) VALUES ('${req.body.userid}', '${req.body.password}')`);

            const results = { 'results': (result) ? result.rows : null };
            res.render('pages/login', results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))