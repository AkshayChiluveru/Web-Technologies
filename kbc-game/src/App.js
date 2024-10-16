// App.js
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const App = () => {
  const [name, setName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [question, setQuestion] = useState(null);
  const [players, setPlayers] = useState([]);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('question', (question) => {
      setQuestion(question);
      setMessage('');
    });

    socket.on('correctAnswer', ({ name }) => {
      setMessage(`Congratulations ${name}! Correct Answer!`);
    });

    socket.on('wrongAnswer', ({ message }) => {
      setMessage(message);
    });

    socket.on('playerList', (players) => {
      setPlayers(players);
    });
  }, []);

  const handleJoin = () => {
    socket.emit('join', name);
    setIsJoined(true);
  };

  const handleAnswer = () => {
    socket.emit('answer', { id: socket.id, answer });
  };

  return (
    <div className="App">
      {!isJoined ? (
        <div>
          <h2>Scan the QR code to join the game</h2>
          <QRCode value={window.location.href} />
          <br />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleJoin}>Join Game</button>
        </div>
      ) : (
        <div>
          {question && (
            <div>
              <h2>{question.question}</h2>
              <div>
                {question.options.map((option, index) => (
                  <button key={index} onClick={() => setAnswer(option[0])}>
                    {option}
                  </button>
                ))}
              </div>
              <button onClick={handleAnswer}>Submit Answer</button>
            </div>
          )}
          {message && <p>{message}</p>}
          <h3>Players</h3>
          <ul>
            {players.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
