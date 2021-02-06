const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (client) => {
  // here you can start emitting events to the client
  client.on("subscribeToTimer", (interval) => {
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date().toTimeString());
    }, interval);
  });
});

const port = 8000;

io.listen(port);
console.log("listening on port ", port);
