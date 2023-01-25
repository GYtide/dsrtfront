import WebSocket from 'ws';

const ws = new WebSocket('ws://127.0.0.1:8080');

ws.on('open', function open() {
  const array = new Float32Array(5);

  for (var i = 0; i < array.length; ++i) {
    array[i] = i / 2;
  }

  ws.send(array);
});

