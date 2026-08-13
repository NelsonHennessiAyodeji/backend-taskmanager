import express from 'express';

const server = express();
const port = process.env.port || 3000

server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
