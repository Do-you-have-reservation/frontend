import {
  addMachine,
  addReservationElder,
  getElders,
  getReservations,
  updateReservationElder,
} from "../firebaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Countdown from "./Couontdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Props } from "../interfaces/Queue.interface";

const ScrollArea = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: scroll;
  width: 100%;
  height: 1000px;
`;

const Item = styled.div`
  flex: 0 0 500px;
  margin: 0 10px;
  background-color: #ccc;
`;

interface currentElderInfo {
  machineId: string;
  machineIdx: number;
  reservationIdx: number;
  currentReservations: any;
}

const SlideSection = (props: any, { handleAddToQueue }: Props) => {
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
                    backgroundColor: "skyblue",
                    marginTop: "5px",
                  }}
                  onClick={() =>
                    updateCurrentElderInfo(props.currentElderInfo, elder.name)
                  }
                >
                  {elder.name}
                </button>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
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
                    backgroundColor: "skyblue",
                    marginTop: "5px",
                  }}
                  onClick={() =>
                    addCurrentElderInfo(props.currentElderInfo, elder.name)
                  }
                >
                  {elder.name}
                </button>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const Reservations = (props: any) => {
    return (
      <button
        style={{
          width: "100%",
          height: "140px",
          backgroundColor: "skyblue",
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
        {props.name}
      </button>
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
              <Countdown currentReservations={index.reservations} />

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
                  backgroundColor: "skyblue",
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
                추가하기
              </button>
            </Item>
          );
        })}
        <Item style={{ backgroundColor: "red" }}>
          <button
            onClick={() => createMachine()}
            style={{ width: "100%", height: "100%" }}
          >
            추가하기
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

export default SlideSection;
