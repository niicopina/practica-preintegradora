import server from "./app";
import { Server } from "socket.io";

const PORT = 8080

const ready = () => {
    console.log('server ready on port: ' + PORT)
}

const http_server = server.listen(PORT, ready)

//const socket_server = new Server(http_server)