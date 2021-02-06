import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

const subscribeToTimer = (cb) => {
    socket.on('timer', timestamp => cb(null, timestamp));
    console.log(socket);
    socket.emit('subscribeToTimer', 1000);
};

export { subscribeToTimer };
