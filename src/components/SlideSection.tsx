import {
  addMachine,
  addReservationElder,
  deleteElder,
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
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-toastify";

const ScrollArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 900px;
  margin: 4px;
  border-radius: 3px;
  border-color: #ece6cc;
  border-style: solid;
  border-width: 3px;
  overflow-x: scroll;
`;

const Item = styled.div`
  flex: 0 0 460px;
  background-color: white;
`;

interface currentElderInfo {
  machineId: string;
  machineIdx: number;
  reservationIdx: number;
  currentReservations: any;
}

const SlideSection = ({ handleAddToQueue, setItems, items }: Props) => {
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [updateModalShow, setUpdateModalShow] = React.useState(false);
  const [elders, setElders] = useState<any>([]);
  const [currentElderInfo, setCurrentElderInfo] = useState<currentElderInfo>();
  const notify = (text: string) => toast(text);
  async function deleteSelectedElder(elderId: string) {
    await deleteElder(elderId);
    setElders(
      await (await getElders()).sort((a, b) => a.name.localeCompare(b.name))
    );
  }

  async function createAddElderModal(props: any) {
    setElders(
      await (await getElders()).sort((a, b) => a.name.localeCompare(b.name))
    );
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
    setElders(
      await (await getElders()).sort((a, b) => a.name.localeCompare(b.name))
    );
    await console.log(elders);
    await setCurrentElderInfo({
      machineId: props.machineId,
      currentReservations: props.currentReservations,
      machineIdx: props.machineIdx,
      reservationIdx: props.reservationIdx,
    });
    await setUpdateModalShow(true);
  }
  async function createMachine() {
    if (items.length > 29) {
      notify("최대 30개까지 마사지 기계를 등록할 수 있습니다.");
    } else {
      await addMachine();
      const reservations = await getReservations();
      await setItems(reservations);
      await console.log(reservations);
    }
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Button
                    style={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "white",
                      marginTop: "5px",
                      borderColor: "#e3ccec",
                    }}
                    onClick={() =>
                      updateCurrentElderInfo(props.currentElderInfo, elder.name)
                    }
                  >
                    <text style={{ color: "black", fontSize: "60px" }}>
                      {" "}
                      {elder.name}{" "}
                    </text>
                  </Button>
                  <Button
                    style={{
                      height: "200px",
                      backgroundColor: "white",
                      marginTop: "5px",
                      borderColor: "#ece6cc",
                    }}
                    onClick={() => deleteSelectedElder(elder.id)}
                  >
                    <text style={{ color: "black" }}> 삭제</text>
                  </Button>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ background: "white", borderColor: "#ece6cc" }}
            onClick={props.onHide}
          >
            <text style={{ color: "black" }}> Close </text>
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
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    style={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "white",
                      borderColor: "#ece6cc",
                      marginTop: "5px",
                    }}
                    onClick={() =>
                      addCurrentElderInfo(props.currentElderInfo, elder.name)
                    }
                  >
                    <text style={{ color: "black", fontSize: "60px" }}>
                      {elder.name}
                    </text>
                  </Button>
                  <Button
                    style={{
                      height: "200px",
                      backgroundColor: "white",
                      borderColor: "#ece6cc",

                      marginTop: "5px",
                    }}
                    onClick={() => deleteSelectedElder(elder.id)}
                  >
                    <text style={{ color: "black" }}>삭제</text>
                  </Button>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ background: "white", borderColor: "#ece6cc" }}
            onClick={props.onHide}
          >
            <text style={{ color: "black" }}>Close</text>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

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
                  setAddModalShow={setAddModalShow}
                  setUpdateModalShow={setUpdateModalShow}
                  createUpdateElderModal={createUpdateElderModal}
                  setItems={setItems}
                />
              </BorderdDiv>
              <Button
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "white",
                  marginTop: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#ece6cc",
                }}
                onClick={() =>
                  createAddElderModal({
                    machineId: index.id,
                    currentReservations: index.reservations,
                  })
                }
              >
                <text style={{ color: "black" }}>추가하기</text>
              </Button>
            </Item>
          );
        })}
        <Item style={{ backgroundColor: "#ebd2a4" }}>
          <Button
            onClick={() => createMachine()}
            style={{
              width: "100%",
              height: "100%",
              background: "white",
              borderColor: "#ece6cc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IoIosAddCircle color="#ece6cc" size={150} />
          </Button>
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
  border-color: #ece6cc;
  border-style: solid;
  border-width: 3px;
  height: 835px;
`;

export default SlideSection;
