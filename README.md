# Socket Timer
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/ezebinker/socket-timer/blob/master/README.en.md)

Socket Timer es un SPA desarrollado con React, que recibe datos desde un servidor Node.js. Utiliza Socket.io para establecer comunicación entre el front y el back en tiempo real. 

## Instalación

Clonar el repositorio e instalar todas las dependencias utilizando *npm* (Node Package Manager). 

```bash
npm install
```

## Definición de los archivos principales

### *api.js*
```javascript
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

const subscribeToTimer = (cb) => {
    socket.on('timer', timestamp => cb(null, timestamp));
    console.log(socket);
    socket.emit('subscribeToTimer', 1000);
};

export { subscribeToTimer };
```

### *app.js*
```javascript
const [timestamp, setTimestamp] = useState("no timestamp yet");

useEffect(() => {
subscribeToTimer((err, timestamp) => setTimestamp(timestamp));
});
```

### *server.js*
```javascript
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (client) => {
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

```

## Ejecución

### Back

*Default port: 8000*

```bash
cd socket-timer
npm i nodemon
nodemon server
```

### Front

```bash
cd socket-timer
npm start
```

## Referencias
[Medium - Combining React With Socket.io](https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34)
