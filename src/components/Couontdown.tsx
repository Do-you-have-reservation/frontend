import React, { useState, useEffect, useRef } from "react";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};
// const INITIAL_COUNT = 60 * 15;
const INITIAL_COUNT = 5;

//바꿔보자 stopCount = 0에서 올려가는 방법으로

export const Countdown = (props: any) => {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const [stopCount, setStopCount] = useState(0);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  function countUp360() {
    setSecondsRemaining(secondsRemaining + 3600);
    console.log(secondsRemaining);
  }
  function countDown360() {
    if (secondsRemaining >= 3600) {
      setSecondsRemaining(secondsRemaining - 3600);
      console.log(secondsRemaining);
    }
  }

  function countUp60() {
    setSecondsRemaining(secondsRemaining + 60);
    console.log(secondsRemaining);
  }
  function countDown60() {
    if (secondsRemaining >= 60) {
      setSecondsRemaining(secondsRemaining - 60);
      console.log(secondsRemaining);
    }
  }
  function countUp1() {
    setSecondsRemaining(secondsRemaining + 1);
    console.log(secondsRemaining);
  }
  function countDown1() {
    setSecondsRemaining(secondsRemaining - 1);
    console.log(secondsRemaining);
  }

  const handleStart = (val: number) => {
    props.handleAddToQueue(
      props.currentReservations[stopCount + val] +
        `님 마사지를 시작합니다. ${props.currentMachineIdx + 1}번 마사지기에 착석해주십시오.`
    );

    setStatus(STATUS.STARTED);
  };

  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };
  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(INITIAL_COUNT);
  };

  useInterval(
    async () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining((secondsRemaining) => secondsRemaining - 1);
      } else {
        await setStatus(STATUS.STOPPED);
        await setSecondsRemaining(INITIAL_COUNT);
        await setStopCount((stopCount: any) => stopCount + 1);

        await props.handleAddToQueue(
          props.currentReservations[stopCount] + "님 마사지가 종료되었습니다."
        );

        if (stopCount + 1 < props.currentReservations.length) {
          await handleStart(1);
        }
        if (stopCount + 1 === props.currentReservations.length) {
          setStopCount(0);
        }
      }
    },
    status === STATUS.STARTED ? 1000 : null
  );

  return (
    <div className="App">
      <button onClick={() => handleStart(0)} type="button">
        Start
      </button>
      <button onClick={handleStop} type="button">
        Stop
      </button>
      <button onClick={handleReset} type="button">
        Reset
      </button>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <div style={{ flexDirection: "column", display: "flex" }}>
          <button onClick={countUp360}>up</button>
          <input value={twoDigits(hoursToDisplay)}></input>
          <button onClick={countDown360}>down</button>
        </div>
        <div style={{ flexDirection: "column", display: "flex" }}>
          <button onClick={countUp60}>up</button>
          <input value={twoDigits(minutesToDisplay)}></input>
          <button onClick={countDown60}>down</button>
        </div>
        <div style={{ flexDirection: "column", display: "flex" }}>
          <button onClick={countUp1}>up</button>
          <input value={twoDigits(secondsToDisplay)}></input>
          <button onClick={countDown1}>down</button>
        </div>
      </div>
      <div>Status: {status}</div>
    </div>
  );
};

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: any, delay: any) {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num: any) => String(num).padStart(2, "0");
