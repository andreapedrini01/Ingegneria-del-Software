const express = require('express');
const app = express();
const cors = require('cors')
const swaggerUI = require('swagger-ui-express') 
const swaggerJsDoc = require('swagger-jsdoc')
const { frontend } = require('../config');
const authentication = require('./authentication.js');
const tokenChecker = require('./tokenChecker.js');
const users = require('./users.js');
const fs = require('fs');
const yaml = require('js-yaml');
const groups = require('./groups.js');
const crm = require('./crm.js');
const events = require('./events.js');
const path = require('path');
const calendars = require('./calendars.js');

/**
 * Configure Swagger
 */
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'SpazzaTN API',
        version: '1.0.0'
        },
    },
    apis: ['./app/*.js'], // files containing annotations as above
    };
const swaggerDocument = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
fs.writeFileSync('./swagger.yaml', yaml.dump(swaggerDocument));

/**
 * Configure Express.js parsing middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/**
 * CORS requests
 */
// Lista dei domini consentiti
const allowedOrigins = [
    'http://localhost:5173',
    'https://ingegneria-del-software-fsjj.onrender.com',
    'http://localhost:8080'
];

// Configurazione del middleware CORS
app.use(cors({
    origin: function(origin, callback) {
        // Consentire le richieste senza origine (ad esempio, per i test locali)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true // Permetti l'invio di cookie nelle richieste
}));

// // Add headers before the routes are defined
app.use(function (req, res, next) {

//     // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

//     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
     next();
 });



/**
 * Serve front-end static files
 */
const FRONTEND = path.join(__dirname, '..', frontend);
app.use('/', express.static( FRONTEND ));

// If process.env.FRONTEND folder does not contain index.html then use the one from static
app.use('/', express.static('static')); // expose also this folder



app.use((req,res,next) => {
    console.log(req.method + ' ' + req.url)
    next()
})

/**
 * Authentication routing and middleware
 */
app.use('/api/v1/authentications', authentication);

// access is restricted only to authenticated users
// a valid token must be provided in the request
app.use('/api/v1/users/me', tokenChecker);

app.use('/api/v1/calendars', tokenChecker, calendars);

app.use('/api/v1/groups', tokenChecker, groups);

/**
 * Resource routing
 */
app.use('/api/v1/users', users);

app.use('/api/v1/crm', crm);

app.use('/api/v1/events', events);

app.get('/api/v1/users/favicon.ico', (req, res) => {
    const filePath = path.join(__dirname, '../utils/Calendar', 'favicon.ico');
    res.sendFile(filePath);
});

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;