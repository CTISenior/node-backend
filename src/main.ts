import express from 'express';
import RateLimit from 'express-rate-limit';
import cors from 'cors';
import { httpServer } from './services/socket';

import tenantRouter from './routes/tenantRouter';
import assetRouter from './routes/assetRouter';
import deviceRouter from './routes/deviceRouter';
import alertRouter from './routes/alertRouter';
import telemetryRouter from './routes/telemetryRouter';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.BACKEND_PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;
const ENDPOINT = process.env.BACKEND_ENDPOINT;

const corsOptions = {
  // origin: `http://localhost:${PORT}`
  origin: '*',
};

const apiLimiter = RateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10000, // Limit each IP to 100 requests
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests!',
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(apiLimiter); // apply rate limiter to all requests
app.use((request, response, next) => {
  next();
});


// routers
app.use(ENDPOINT, tenantRouter); // -> middleware
app.use(ENDPOINT, assetRouter); // -> middleware
app.use(ENDPOINT, deviceRouter); // -> middleware
app.use(ENDPOINT, alertRouter); // -> middleware
app.use(ENDPOINT, telemetryRouter); // -> middleware


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.debug('Express listening on port: %d', PORT);
});

httpServer.listen(SOCKET_PORT, () => {
  console.log('Socket-io listening on port: %d', SOCKET_PORT);
});