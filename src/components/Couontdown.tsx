import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/esm/Button";
import { styled } from "styled-components";
import { Display } from "react-7-segment-display";

import {
  addReservationElder,
  deleteFirstReservationElder,
  deleteMachine,
  deleteReservationElder,
  getElders,
  getReservations,
  updateReservationElder,
} from "../firebaseConfig";
import Modal from "react-bootstrap/Modal";
import { koreanNumbers } from "../utils/koreanNumbers";

const STATUS = {
  STARTED: "진행",
  STOPPED: "정지",
};
// const INITIAL_COUNT = 60 * 15;
const INITIAL_COUNT = 60 * 15;

//바꿔보자 stopCount = 0에서 올려가는 방법으로
interface currentElderInfo {
  machineId: string;
  machineIdx: number;
  reservationIdx: number;
  currentReservations: any;
}
export const Countdown = (props: any) => {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const [items, setItems] = useState<any>([]);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  async function deleteCurrentElderInfo(
    updateCurrentElderInfo: currentElderInfo,
    currentName: string
  ) {
    await deleteReservationElder(
      updateCurrentElderInfo.machineId,
      currentName,
      updateCurrentElderInfo.reservationIdx,
      updateCurrentElderInfo.currentReservations
    );
    setItems(await getReservations());
  }
  const EmptyReservation = (props: any) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "500px",
            backgroundColor: "#ebd2a4",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <text style={{ color: "white" }}> 예약 없음</text>
        </div>
      </div>
    );
  };
  const Reservations = (props: any) => {
    return status === STATUS.STARTED && props.reservationIdx === 0 ? (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <button
          style={{
            width: "100%",
            height: "140px",
            backgroundColor: "#2fdf49",
            marginTop: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() =>
            props.createUpdateElderModal({
              machineId: props.machineId,
              machineIdx: props.machineIdx,
              reservationIdx: props.reservationIdx,
              currentReservations: props.currentReservations,
            })
          }
        >
          <text style={{ color: "white" }}> {props.name}</text>
        </button>
        <button
          style={{ background: "#07911c", marginTop: "5px" }}
          onClick={() =>
            deleteCurrentElderInfo(
              {
                machineId: props.machineId,
                machineIdx: props.machineIdx,
                reservationIdx: props.reservationIdx,
                currentReservations: props.currentReservations,
              },
              props.name
            )
          }
        >
          <text style={{ color: "white" }}>삭제</text>
        </button>
      </div>
    ) : (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <button
          style={{
            width: "100%",
            height: "140px",
            backgroundColor: "#ebd2a4",
            marginTop: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() =>
            props.createUpdateElderModal({
              machineId: props.machineId,
              machineIdx: props.machineIdx,
              reservationIdx: props.reservationIdx,
              currentReservations: props.currentReservations,
            })
          }
        >
          <text style={{ color: "white" }}> {props.name}</text>
        </button>
        <button
          style={{ background: "orange", marginTop: "5px" }}
          onClick={() =>
            deleteCurrentElderInfo(
              {
                machineId: props.machineId,
                machineIdx: props.machineIdx,
                reservationIdx: props.reservationIdx,
                currentReservations: props.currentReservations,
              },
              props.name
            )
          }
        >
          <text style={{ color: "white" }}>삭제</text>
        </button>
      </div>
    );
  };
  async function deleteMachineAndFetch(machineId: any) {
    await deleteMachine(machineId);
    const reservations = await getReservations();
    await props.setItems(reservations);
    await console.log(reservations);
  }
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

  const handleStart = () => {
    if (props.currentReservations.length > 0) {
      props.handleAddToQueue(
        props.currentReservations[0] +
          `님 마사지를 시작합니다. ${convertSpeakNumber(props.currentMachineIdx + 1)}번 마사지기에 착석해주십시오.`
      );

      setStatus(STATUS.STARTED);
    }
  };

  const convertSpeakNumber = (number: number) => {
    return koreanNumbers[number];
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

        await props.handleAddToQueue(
          props.currentReservations[0] + "님 마사지가 종료되었습니다."
        );

        await deleteFirstReservationElder(
          props.currentMachineId,
          props.currentReservations
        );
      }
    },
    status === STATUS.STARTED ? 1000 : null
  );

  return (
    <div className="App">
      <BorderdDiv style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{ margin: "5px", background: "orange" }}
          onClick={() => handleStart()}
          type="button"
        >
          시작
        </Button>
        <Button
          style={{ margin: "5px", background: "orange" }}
          onClick={handleStop}
          type="button"
        >
          정지
        </Button>
        <Button
          style={{ margin: "5px", background: "orange" }}
          onClick={() => deleteMachineAndFetch(props.currentMachineId)}
          type="button"
        >
          삭제
        </Button>

        {/* <Button
          style={{ margin: "5px", background: "orange" }}
          onClick={handleReset}
          type="button"
        >
          리셋
        </Button> */}
      </BorderdDiv>

      <BorderdDiv style={{ flexDirection: "row", display: "flex" }}>
        <div style={{ flexDirection: "column", display: "flex" }}>
          <button onClick={countUp360}>up</button>
          <BorderdDiv>
            <Display
              value={twoDigits(hoursToDisplay)}
              color="blue"
              count={2}
              height={100}
              skew={false}
            ></Display>
          </BorderdDiv>

          <button onClick={countDown360}>down</button>
        </div>
        <div style={{ flexDirection: "column", display: "flex" }}>
          <button onClick={countUp60}>up</button>
          <BorderdDiv>
            <Display
              value={twoDigits(minutesToDisplay)}
              color="blue"
              count={2}
              height={100}
              skew={false}
            ></Display>
          </BorderdDiv>

          <button onClick={countDown60}>down</button>
        </div>
        <div style={{ flexDirection: "column", display: "flex" }}>
          <button onClick={countUp1}>up</button>
          <BorderdDiv>
            <Display
              value={twoDigits(secondsToDisplay)}
              color="blue"
              count={2}
              height={100}
              skew={false}
            ></Display>
          </BorderdDiv>

          <button onClick={countDown1}>down</button>
        </div>
      </BorderdDiv>
      <BorderdDiv style={{ display: "flex", justifyContent: "center" }}>
        상태 : {status}
      </BorderdDiv>

      <BorderdDiv>
        {props.currentReservations.length === 0 ? (
          <EmptyReservation
            machineId={props.currentMachineId}
            machineIdx={props.currentMachineIdx}
            currentReservations={props.currentReservations}
            createUpdateElderModal={props.createUpdateElderModal}
          ></EmptyReservation>
        ) : (
          props.currentReservations.map(
            (reservation: string, reservationIdx: any) => {
              return (
                <Reservations
                  machineId={props.currentMachineId}
                  machineIdx={props.currentMachineIdx}
                  reservationIdx={reservationIdx}
                  currentReservations={props.currentReservations}
                  name={reservation}
                  createUpdateElderModal={props.createUpdateElderModal}
                ></Reservations>
              );
            }
          )
        )}
      </BorderdDiv>
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
const BorderdDiv = styled.div`
  margin: 4px;
  border-radius: 3px;
  border-color: black;
  border-style: solid;
  border-width: 3px;
`;
