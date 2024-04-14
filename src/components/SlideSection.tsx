import { addMachine, getReservations } from "../firebaseConfig";
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
function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function createItems() {
  const itemsArr = [];
  for (let i = 0; i < 10; i++) {
    itemsArr.push(i);
  }
  return itemsArr;
}

const SlideSection = () => {
  const [items, setItems] = useState<any>([]);
  const [modalShow, setModalShow] = React.useState(false);
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
        onClick={() => setModalShow(true)}
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
  }, [createItems]);

  return (
    <>
      <ScrollArea>
        {items.map((index: any) => {
          return (
            <Item key={index}>
              <Countdown />
              {index.reservations.map((reservation: string) => {
                return <Reservations name={reservation}></Reservations>;
              })}
              <button onClick={() => getReservations()}>get</button>
              <button onClick={() => addMachine()}>add</button>
            </Item>
          );
        })}
        <Item style={{ backgroundColor: "red" }}>
          <button
            onClick={() => addMachine()}
            style={{ width: "100%", height: "100%" }}
          >
            추가하기
          </button>
        </Item>
      </ScrollArea>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default SlideSection;
