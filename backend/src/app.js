const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth')

dotenv.config();

const app = express();
const back_port = process.env.BACK_PORT;
const url1 = process.env.LOCAL_IP;
const url2 = process.env.LOCAL_IP2;
const url3 = process.env.HOST_IP;

app.use((req, res, next) => {
	if (!req.headers['x-mobile-app'] || req.headers['x-mobile-app'] !== 'SwiftyCompanion')
		return res.status(403).json({ message: 'Access forbidden' });
	next();
});
app.use(cors({
	origin: '*',
	methods: ['POST'],
	credentials: true
}));
app.use(express.json()); 

app.use('/auth', authRouter);

app.listen(back_port, '0.0.0.0', () => {
	console.log(`Server is running on http://${url1}:${back_port}, http://${url2}:${back_port} and http://${url3}:${back_port}`);
});
