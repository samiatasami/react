import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (ms) => {
    const minutes = Math.floor((ms / 60000) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    const milliseconds = Math.floor((ms / 10) % 100);

    return (
      `${String(minutes).padStart(2, '0')}:` +
      `${String(seconds).padStart(2, '0')}:` +
      `${String(milliseconds).padStart(2, '0')}`
    );
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch</h1>
      <div className="time-display">
        <span>{formatTime(time)}</span>
      </div>
      <div className="controls">
        {running ? (
          <button onClick={() => setRunning(false)}>Stop</button>
        ) : (
          <button onClick={() => setRunning(true)}>Start</button>
        )}
        <button onClick={() => {
          setRunning(false);
          setTime(0);
        }}>Reset</button>
      </div>
    </div>
  );
}

export default App;