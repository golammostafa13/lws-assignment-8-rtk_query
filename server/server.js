const data = require("./db_todos.json");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();
const port = process.env.P || 8000
server.use(middlewares);
server.use(router);

server.listen(port, ()=> {
    console.log("server is running on ", port);
});