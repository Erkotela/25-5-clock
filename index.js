const PomodoroApp = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timerLabel, setTimerLabel] = React.useState("Session");
  const [timeLeft, setTimeLeft] = React.useState(sessionLength * 60);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  React.useEffect(() => {
    if (timeLeft === 0) {
      const beep = document.getElementById("beep");
      beep.play();

      if (timerLabel === "Session") {
        setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel("Session");
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, breakLength, sessionLength, timerLabel]);

  const startStopTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  };

  const decrementBreakLength = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementBreakLength = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementSessionLength = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  const incrementSessionLength = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  React.useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <h1>Pomodoro App</h1>

      <div id="break-label">Break Length</div>
      <div id="session-label">Session Length</div>

      <div>
        <button id="break-decrement" onClick={decrementBreakLength}>
          -
        </button>
        <span id="break-length">{breakLength}</span>
        <button id="break-increment" onClick={incrementBreakLength}>
          +
        </button>
      </div>

      <div>
        <button id="session-decrement" onClick={decrementSessionLength}>
          -
        </button>
        <span id="session-length">{sessionLength}</span>
        <button id="session-increment" onClick={incrementSessionLength}>
          +
        </button>
      </div>

      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>

      <button id="start_stop" onClick={startStopTimer}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button id="reset" onClick={resetTimer}>
        Reset
      </button>

      <audio id="beep" src="audio.wav"></audio>
    </div>
  );
};
ReactDOM.render(<PomodoroApp />, document.getElementById("root"));
