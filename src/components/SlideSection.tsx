import {
  addMachine,
  addReservationElder,
  deleteMachine,
  deleteReservationElder,
  getElders,
  getReservations,
  updateReservationElder,
} from "../firebaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Props } from "../interfaces/Queue.interface";
import { Countdown } from "./Couontdown";

const ScrollArea = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: scroll;
  width: 100%;
  height: 1000px;
  margin: 4px;
  border-radius: 3px;
  border-color: black;
  border-style: solid;
  border-width: 3px;
`;

const Item = styled.div`
  flex: 0 0 500px;
  margin: 0 10px;
  background-color: white;
`;

interface currentElderInfo {
  machineId: string;
  machineIdx: number;
  reservationIdx: number;
  currentReservations: any;
}

const SlideSection = ({ handleAddToQueue }: Props) => {
  const [items, setItems] = useState<any>([]);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [updateModalShow, setUpdateModalShow] = React.useState(false);

  const [elders, setElders] = useState<any>([]);
  const [currentElderInfo, setCurrentElderInfo] = useState<currentElderInfo>();

  async function createMachine() {
    await addMachine();

    const reservations = await getReservations();
    await setItems(reservations);
    await console.log(reservations);
  }

  async function deleteMachineAndFetch(machineId: any) {
    await deleteMachine(machineId);
    const reservations = await getReservations();
    await setItems(reservations);
    await console.log(reservations);
  }

  async function createAddElderModal(props: any) {
    setElders(await getElders());
    await console.log(elders);
    await setCurrentElderInfo({
      machineId: props.machineId,
      currentReservations: props.currentReservations,
      machineIdx: props.machineIdx,
      reservationIdx: props.reservationIdx,
    });
    await setAddModalShow(true);
  }
  async function createUpdateElderModal(props: any) {
    setElders(await getElders());
    await console.log(elders);
    await setCurrentElderInfo({
      machineId: props.machineId,
      currentReservations: props.currentReservations,
      machineIdx: props.machineIdx,
      reservationIdx: props.reservationIdx,
    });
    await setUpdateModalShow(true);
  }

  async function addCurrentElderInfo(
    currentElderInfo: currentElderInfo,
    currentName: string
  ) {
    await addReservationElder(
      currentElderInfo.machineId,
      currentName,
      currentElderInfo.currentReservations
    );
    setAddModalShow(false);
  }

  async function updateCurrentElderInfo(
    updateCurrentElderInfo: currentElderInfo,
    currentName: string
  ) {
    await updateReservationElder(
      updateCurrentElderInfo.machineId,
      currentName,
      updateCurrentElderInfo.reservationIdx,
      updateCurrentElderInfo.currentReservations
    );
    setUpdateModalShow(false);
  }

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

  function UpdateVerticallyCenteredModal(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">예약하기</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-dialog modal-dialog-scrollable">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {props.elders.map((elder: any) => {
              return (
                <button
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#ebd2a4",
                    marginTop: "5px",
                  }}
                  onClick={() =>
                    updateCurrentElderInfo(props.currentElderInfo, elder.name)
                  }
                >
                  <text style={{ color: "white" }}> {elder.name} </text>
                </button>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ background: "orange" }} onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function AddVerticallyCenteredModal(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">예약하기</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-dialog modal-dialog-scrollable">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {props.elders.map((elder: any) => {
              return (
                <button
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#ebd2a4",
                    marginTop: "5px",
                  }}
                  onClick={() =>
                    addCurrentElderInfo(props.currentElderInfo, elder.name)
                  }
                >
                  <text style={{ color: "white" }}> {elder.name} </text>
                </button>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ background: "orange" }} onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const Reservations = (props: any) => {
    return (
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
            createUpdateElderModal({
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

  useEffect(() => {
    async function createItems() {
      const reservations = await getReservations();
      await setItems(reservations);
      await console.log(reservations);
    }
    createItems();
  }, []);

  useEffect(() => {}, [elders]);

  return (
    <>
      <ScrollArea>
        {items.map((index: any, machineIdx: any) => {
          return (
            <Item key={index}>
              <BorderdDiv style={{ display: "flex", flexDirection: "row" }}>
                <Countdown
                  currentMachineIdx={machineIdx}
                  currentReservations={index.reservations}
                  currentMachineId={index.id}
                  handleAddToQueue={handleAddToQueue}
                />
                <button
                  style={{ background: "orange", width: "30px" }}
                  onClick={() => deleteMachineAndFetch(index.id)}
                >
                  <text style={{ color: "white" }}>삭제</text>
                </button>
              </BorderdDiv>

              <BorderdDiv>
                {" "}
                {index.reservations.map(
                  (reservation: string, reservationIdx: any) => {
                    return (
                      <Reservations
                        machineId={index.id}
                        machineIdx={machineIdx}
                        reservationIdx={reservationIdx}
                        currentReservations={index.reservations}
                        name={reservation}
                      ></Reservations>
                    );
                  }
                )}
                <button
                  style={{
                    width: "100%",
                    height: "140px",
                    backgroundColor: "orange",
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() =>
                    createAddElderModal({
                      machineId: index.id,
                      currentReservations: index.reservations,
                    })
                  }
                >
                  <text style={{ color: "white" }}>추가하기</text>
                </button>
              </BorderdDiv>
            </Item>
          );
        })}
        <Item style={{ backgroundColor: "#ebd2a4" }}>
          <button
            onClick={() => createMachine()}
            style={{ width: "100%", height: "100%" }}
          >
            <text style={{ color: "white" }}>안마기 추가</text>
          </button>
        </Item>
      </ScrollArea>
      <AddVerticallyCenteredModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        elders={elders}
        currentElderInfo={currentElderInfo}
      />
      <UpdateVerticallyCenteredModal
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
        elders={elders}
        currentElderInfo={currentElderInfo}
      />
    </>
  );
};
const BorderdDiv = styled.div`
  margin: 4px;
  border-radius: 3px;
  border-color: black;
  border-style: solid;
  border-width: 3px;
`;

export default SlideSection;
