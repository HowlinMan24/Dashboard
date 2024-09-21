import express from 'express';
import http from 'http';
import logger, {httpLogger} from "./utils/logger";
import {initializeSocket} from "./server/socket";

const app = express();
const PORT = 3500;
const server = http.createServer(app);
const io = initializeSocket(server);

app.use(httpLogger)

app.get('/', (req, res) => {
    logger.info('Root endpoint hit!')
    res.send("Hello from the backend");
});

server.listen(PORT, () => {
    logger.info(`Server is running on the http://localhost:${PORT}`);
})