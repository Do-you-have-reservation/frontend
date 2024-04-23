import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import styled from "styled-components";

import {
  addReservationElder,
  deleteElder,
  getElders,
  getReservations,
} from "../firebaseConfig";
import { Props } from "../interfaces/Queue.interface";
import { useStore } from "../store/store.module";

const ReservationSection = ({ setItems }: Props) => {
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [elders, setElders] = useState<any>([]);
  const [currentReservations, setCurrentReservations] = useState<any>([]);
  const [machineId, setMachineId] = useState<any>();

  async function deleteSelectedElder(elderId: string) {
    await deleteElder(elderId);
    setElders(
      await (await getElders()).sort((a, b) => a.name.localeCompare(b.name))
    );
  }
  async function addCurrentElderInfo(
    machineId: string,
    currentReservations: [],
    currentName: string
  ) {
    await addReservationElder(machineId, currentName, currentReservations);
    await setItems(await getReservations());
    await setAddModalShow(false);
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
                      addCurrentElderInfo(
                        machineId,
                        currentReservations,
                        elder.name
                      )
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

  async function createAddElderModal(
    machineId: string,
    currentReservations: []
  ) {
    setElders(
      await (await getElders()).sort((a, b) => a.name.localeCompare(b.name))
    );
    await console.log(elders);

    setMachineId(machineId);
    setCurrentReservations(currentReservations);

    await setAddModalShow(true);
  }

  interface Machine {
    id: string;
    reservations: [];
  }

  interface TimeData {
    time: number;
    machineId: string;
    currentReservations: [];
  }

  async function reserveAtFastestMachine() {
    try {
      const reservations: Machine[] = await getReservations();
      console.log(reservations);
      const times = useStore.getState().getTimes(); // 스토어에서 직접 상태를 가져옵니다.

      let datas: TimeData[] = []; // 올바르게 배열을 초기화

      reservations.forEach((machine) => {
        const result = times.find((item: any) => item.machineId === machine.id);

        if (result) {
          // 기존 machineId가 times에 존재하면, 현재 시간에 추가 계산
          datas.push({
            time: (machine.reservations.length - 1) * 60 * 15 + result.time,
            machineId: machine.id,
            currentReservations: machine.reservations,
          });
        } else {
          // 새로운 machineId라면, 새로 계산된 시간만 저장
          datas.push({
            time: machine.reservations.length * 60 * 15,
            machineId: machine.id,
            currentReservations: machine.reservations,
          });
        }
      });

      // 배열 정렬, 오름차순으로 정렬하기 위해 비교 함수 제공
      datas.sort((a, b) => a.time - b.time);

      console.log(datas[0]); // 가장 빠른 기계의 시간과 ID 출력

      createAddElderModal(datas[0].machineId, datas[0].currentReservations);
    } catch (error) {
      console.error("Error in reserveAtFastestMachine:", error);
    }
  }
  return (
    <div>
      <ReservationDiv>
        <Button
          onClick={() => reserveAtFastestMachine()}
          style={{ width: "300px", height: "100px" }}
        >
          가장 빠른 예약하기
        </Button>
      </ReservationDiv>
      <AddVerticallyCenteredModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        elders={elders}
        machineId={machineId}
        currentReservations={currentReservations}
      />
    </div>
  );
};

const ReservationDiv = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export default ReservationSection;
