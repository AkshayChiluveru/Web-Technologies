// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let currentQuestion = 0;
let players = [];

const questions = [
  { id: 1, question: "What is the capital of France?", options: ["A. Paris", "B. Rome", "C. Berlin", "D. Madrid"], answer: "A" },
  { id: 2, question: "Who wrote 'Hamlet'?", options: ["A. Dante", "B. Shakespeare", "C. Homer", "D. Tolkien"], answer: "B" },
  { id: 3, question: "What is 2+2?", options: ["A. 3", "B. 4", "C. 5", "D. 6"], answer: "B" },
  { id: 4, question: "What is the boiling point of water?", options: ["A. 90°C", "B. 80°C", "C. 100°C", "D. 110°C"], answer: "C" },
  { id: 5, question: "Which planet is closest to the sun?", options: ["A. Earth", "B. Mars", "C. Venus", "D. Mercury"], answer: "D" }
];

io.on('connection', (socket) => {
  console.log('New player connected', socket.id);

  // Send current question to newly joined player
  socket.emit('question', questions[currentQuestion]);

  socket.on('join', (name) => {
    players.push({ id: socket.id, name });
    io.emit('playerList', players);
  });

  socket.on('answer', ({ id, answer }) => {
    const correctAnswer = questions[currentQuestion].answer;
    if (answer === correctAnswer) {
      io.emit('correctAnswer', { id, name: players.find(p => p.id === id).name });
      currentQuestion = (currentQuestion + 1) % questions.length;
      io.emit('question', questions[currentQuestion]);
    } else {
      socket.emit('wrongAnswer', { message: 'Incorrect Answer!' });
    }
  });

  socket.on('disconnect', () => {
    players = players.filter(p => p.id !== socket.id);
    io.emit('playerList', players);
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
