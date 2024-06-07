const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const { masterKey } = require('../config');
const Token = require("./models/token");

const tokenChecker = async function(req, res, next) {
	console.log('Checking token');
	
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// if there is no token
	if (!token) {
		return res.status(401).send({ 
			success: false,
			message: 'Nessun token fornito.'
		});
	}

	if (!await Token.findOne({ token: token })) {
		res.status(401).send({ 
			success: false,
			message: 'Il token è scaduto o invalido.'
		});
		return;
	}

	// decode token, verifies secret and checks exp
	jwt.verify(token, masterKey, function(err, decoded) {			
		if (err) {
			return res.status(403).send({
				success: false,
				message: 'Errore nell\'autenticare il token.'
			});		
		} else {
			// if everything is good, save to request for use in other routes
			req.loggedUser = decoded;
			next();
		}
	});
	
};

module.exports = tokenChecker