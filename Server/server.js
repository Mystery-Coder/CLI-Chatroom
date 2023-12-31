const PORT = 3000;

const io = require("socket.io")(PORT, {
	cors: {
		origin: ["*"],
	},
});

io.on("connection", (socket) => {
	socket.on("message", (msg) => {
		//msg will be in format 'name: --msg--'

		io.emit("new-message", msg);
	});

	socket.on("user-exit", (name) => {
		socket.disconnect(true);
		io.emit("new-message", {
			msg: `${name} has exited the chatroom`,
			name,
		});
	});

	socket.on("user-join", (name) => {
		io.emit("new-message", {
			msg: `${name} has joined the chatroom`,
			name,
		});
	});
});
