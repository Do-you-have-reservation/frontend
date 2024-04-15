import {
  addElder,
  addMachine,
  getElders,
  getReservations,
  updateElder,
} from "../firebaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Countdown from "./Couontdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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
  currentReservations: any;
}

const SlideSection = () => {
  const [items, setItems] = useState<any>([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [elders, setElders] = useState<any>([]);
  const [currentElderInfo, setCurrentElderInfo] = useState<currentElderInfo>();

  async function createMachine() {
    await addMachine();

    const reservations = await getReservations();
    await setItems(reservations);
    await console.log(reservations);
  }

  async function createElderModal(props: any) {
    setElders(await getElders());
    await console.log(elders);
    await setCurrentElderInfo({
      machineId: props.machineId,
      currentReservations: props.currentReservations,
    });
    await setModalShow(true);
  }

  async function updateCurrentElderInfo(
    currentElderInfo: currentElderInfo,
    currentName: string
  ) {
    await updateElder(
      currentElderInfo.machineId,
      currentName,
      currentElderInfo.currentReservations
    );
    setModalShow(false);
  }

  function MyVerticallyCenteredModal(props: any) {
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
              <Countdown />

              {index.reservations.map(
                (reservation: string, reservationIdx: any) => {
                  return (
                    <Reservations
                      machineId={index.id}
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
                  createElderModal({
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        elders={elders}
        currentElderInfo={currentElderInfo}
      />
    </>
  );
};

export default SlideSection;
