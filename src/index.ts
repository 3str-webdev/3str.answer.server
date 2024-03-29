import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import express from "express";
import { createServer } from "node:http";
import { Server as SocketServer } from "socket.io";

dotenvConfig();

const clientURL = process.env.CLIENT_URL ?? "";
const PORT = process.env.PORT ?? 1000;

const app = express();
app.use(cors);

const http = createServer(app);

const io = new SocketServer(http, {
	cors: {
		origin: clientURL,
	},
});

io.on("connection", (socket) => {
	console.log(`${socket.id} user connected`);

	socket.on("disconnect", () => {
		console.log(`${socket.id} user disconnected`);
	});
});

http.listen(PORT, () => {
	try {
		console.log(`Server started on http://localhost:${PORT}`);
	} catch (e) {
		console.error(e);
	}
});
