const socket = io('http://localhost:3334');
socket.on('initialize', () => {
  console.log('Websocket connection initialized.');
});

export default socket;
