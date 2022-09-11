const data = require("./db_todos.json");
const jsonServer = require("json-server");
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8000;

server.use(cors());
server.use(middlewares);
server.use(router);

server.listen(port, ()=> {
    console.log("server is running on ", port);
});