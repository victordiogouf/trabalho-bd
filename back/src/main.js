import express from 'express';
import http from 'http';
import cors from 'cors';

import { router } from './router.js';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(router);

server.listen(5566, () => {
  console.log('Server is running on port 5566');
});