/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const intervalRef = useRef(null);
  const [timer, setTimer] = useState("00:00:00");
  // Onde declara o tempo
  const time = 5;
  const initialTime = time * 60;
  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 24);
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }
  function startTimer(deadline) {
    let { total, hours, minutes, seconds } = getTimeRemaining(deadline);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      clearInterval(intervalRef.current);
    }
  }

  function clearTimer(endtime) {
    setTimer("Iniciando..");
    if (intervalRef.current) clearInterval(intervalRef.current);
    const id = setInterval(() => {
      startTimer(endtime);
    }, 1000);
    intervalRef.current = id;
  }
  function getDeadlineTime() {
    let deadline = new Date();
    // O valor 300 é o tempo de 60 segundos * 5 Ok
    deadline.setSeconds(deadline.getSeconds() + initialTime);
    return deadline;
  }
  useEffect(() => {
    clearTimer(getDeadlineTime());

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  function ResetBtn() {
    clearTimer(getDeadlineTime());
  }
  return (
    <div className="App">
      <button onClick={ResetBtn}>Reset</button>
      <h1>{timer}</h1>
    </div>
  );
}

export default App;
