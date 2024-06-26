import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/esm/Button";
import { styled } from "styled-components";
import { Display } from "react-7-segment-display";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { IoIosNutrition } from "react-icons/io";
import { useStore } from "../store/store.module";

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
  const [waitingForStart, setWaitingForStart] = useState(false);
  const updateTimes = useStore((state: any) => state.updateTimes);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;
  const notify = () =>
    toast("진행 중인 마사지들이 모두 끝난 후 기계를 삭제할 수 있습니다.");

  async function deleteCurrentElderInfo(
    updateCurrentElderInfo: currentElderInfo,
    currentName: string
  ) {
    await setStatus(STATUS.STOPPED);
    await setSecondsRemaining(INITIAL_COUNT);

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
            height: "410px",
            backgroundColor: "white",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <text style={{ color: "black" }}> 예약 없음</text>
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
        <Button
          style={{
            width: "100%",
            height: "100px",
            backgroundColor: "white",
            marginTop: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#2fdf49",
            borderWidth: "4px",
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
          <text style={{ color: "black", fontSize: "60px" }}>{props.name}</text>
        </Button>
        <Button
          style={{
            background: "white",
            marginTop: "5px",
            borderColor: "#ece6cc",
          }}
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
          <text style={{ color: "black" }}>삭제</text>
        </Button>
      </div>
    ) : (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button
          style={{
            width: "100%",
            height: "100px",
            backgroundColor: "white",
            marginTop: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#ece6cc",
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
          <text style={{ color: "black", fontSize: "60px" }}>{props.name}</text>
        </Button>
        <Button
          style={{
            background: "white",
            marginTop: "5px",
            borderColor: "#ece6cc",
          }}
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
          <text style={{ color: "black" }}>삭제</text>
        </Button>
      </div>
    );
  };
  async function deleteMachineAndFetch(machineId: any) {
    if (status === STATUS.STOPPED) {
      await setStatus(STATUS.STOPPED);
      await setSecondsRemaining(INITIAL_COUNT);
      await deleteMachine(machineId);
      const reservations = await getReservations();
      await props.setItems(reservations);
      await console.log(reservations);
    }

    if (status === STATUS.STARTED) {
      notify();
    }
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
          `어르신 마사지를 시작합니다. ${convertSpeakNumber(
            props.currentMachineIdx + 1
          )}번 마사지기에 착석해주십시오.`
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
  useEffect(() => {
    let timer: any;
    if (waitingForStart) {
      timer = setTimeout(() => {
        if (waitingForStart && status !== STATUS.STARTED) {
          props.handleAddToQueue(
            props.currentReservations[0] +
              `어르신 안마 받으실 차례입니다. ${convertSpeakNumber(
                props.currentMachineIdx + 1
              )}번 마사지기에 착석해주십시오.`
          );
          setWaitingForStart(false);
        }
      }, 20000);
    }
    return () => clearTimeout(timer);
  }, [waitingForStart, status]);
  useInterval(
    async () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining((secondsRemaining) => secondsRemaining - 1);
        updateTimes(props.currentMachineId, secondsRemaining);
      } else {
        await setStatus(STATUS.STOPPED);
        await setSecondsRemaining(INITIAL_COUNT);
        await props.handleAddToQueue(
          props.currentReservations[0] + "어르신 마사지가 종료되었습니다."
        );
        await deleteFirstReservationElder(
          props.currentMachineId,
          props.currentReservations
        );

        if (props.currentReservations.length > 0) {
          props.handleAddToQueue(
            props.currentReservations[0] +
              `어르신 안마 받으실 차례입니다. ${convertSpeakNumber(
                props.currentMachineIdx + 1
              )}번 마사지기에 착석해주십시오.`
          );
          setWaitingForStart(true);
        }
      }
    },
    status === STATUS.STARTED ? 1000 : null
  );

  return (
    <div className="App">
      <BorderdDiv style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{ margin: "5px", background: "white", borderColor: "#ece6cc" }}
          onClick={() => handleStart()}
          type="button"
        >
          <text style={{ color: "black" }}>시작</text>
        </Button>
        <Button
          style={{ margin: "5px", background: "white", borderColor: "#ece6cc" }}
          onClick={handleStop}
          type="button"
        >
          <text style={{ color: "black" }}>정지</text>
        </Button>
        <Button
          style={{ margin: "5px", background: "white", borderColor: "#ece6cc" }}
          onClick={() => deleteMachineAndFetch(props.currentMachineId)}
          type="button"
        >
          <text style={{ color: "black" }}>삭제</text>
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
        {/* <div style={{ flexDirection: "column", display: "flex" }}>
          <Button
            style={{ background: "white", borderColor: "#ece6cc" }}
            onClick={countUp360}
          >
            <text style={{ color: "black" }}>up</text>
          </Button>
          <div
            style={{
              position: "relative",
            }}
          >
            <Display
              value={twoDigits(hoursToDisplay)}
              color="#ff5e23"
              count={2}
              height={150}
              skew={false}
            ></Display>
          </div>

          <Button
            style={{ background: "white", borderColor: "#ece6cc" }}
            onClick={countDown360}
          >
            <text style={{ color: "black" }}>down</text>
          </Button>
        </div> */}
        <div style={{ flexDirection: "column", display: "flex" }}>
          <Button
            style={{ background: "white", borderColor: "#ece6cc" }}
            onClick={countUp60}
          >
            <text style={{ color: "black" }}>up</text>
          </Button>
          <div
            style={{
              position: "relative",
            }}
          >
            <Display
              value={twoDigits(minutesToDisplay)}
              color="#ff5e23"
              count={2}
              height={120}
              skew={false}
            ></Display>
          </div>

          <Button
            style={{ background: "white", borderColor: "#ece6cc" }}
            onClick={countDown60}
          >
            <text style={{ color: "black" }}>down</text>
          </Button>
        </div>
        <div style={{ flexDirection: "column", display: "flex" }}>
          <Button
            style={{ background: "white", borderColor: "#ece6cc" }}
            onClick={countUp1}
          >
            <text style={{ color: "black" }}>up</text>
          </Button>
          <div
            style={{
              position: "relative",
            }}
          >
            <Display
              value={twoDigits(secondsToDisplay)}
              color="#ff5e23"
              count={2}
              height={120}
              skew={false}
            ></Display>
          </div>

          <Button
            style={{ background: "white", borderColor: "#ece6cc" }}
            onClick={countDown1}
          >
            <text style={{ color: "black" }}>down</text>
          </Button>
        </div>
      </BorderdDiv>
      <BorderdDiv
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <text style={{ textAlign: "center", fontSize: "30px" }}>
          남은 예약 : {props.currentReservations.length}명
        </text>
      </BorderdDiv>

      <BorderdDiv>
        {props.currentReservations.length === 0 ? (
          <div
            style={{ overflowX: "auto", overflowY: "scroll", height: "410px" }}
          >
            <EmptyReservation
              machineId={props.currentMachineId}
              machineIdx={props.currentMachineIdx}
              currentReservations={props.currentReservations}
              createUpdateElderModal={props.createUpdateElderModal}
            ></EmptyReservation>
          </div>
        ) : (
          <div
            style={{
              overflowX: "auto",
              overflowY: "scroll",
              height: "410px",
            }}
          >
            {props.currentReservations.map(
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
            )}
          </div>
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
  border-color: #ece6cc;
  border-style: solid;
  border-width: 3px;
`;
