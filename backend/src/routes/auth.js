const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_42 = "https://api.intra.42.fr/v2";
const REDIRECT_URI = "com.tcharpen.swiftycompanion://redirect"

router.post('/authorize', async (req, res) => {
    let response
	try {
        const { authorizationCode, codeVerifier } = req.body;
		response = await axios.post(`${API_42}/oauth/token`, {
            grant_type: "authorization_code",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: authorizationCode,
            code_verifier: codeVerifier,
            redirect_uri: REDIRECT_URI
        });
	}
	catch (err) {
		console.log(err);
		return res.status(403).json({message: 'Failed to get token'});
	}
    return res.status(200).json({message: response.data})
});

router.post('/refresh', async (req, res) => {
    let response
	try {
        const { refreshToken } = req.body;
		response = await axios.post(`${API_42}/oauth/token`, {
            grant_type: "refresh_token",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: refreshToken
        });
	}
	catch (err) {
		console.log(err);
		return res.status(403).json({message: 'Failed to refresh token'});
	}
    return res.status(200).json({message: response.data})
});

module.exports = router;
