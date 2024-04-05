import { addMachine, getReservations } from "../firebaseConfig";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Countdown from "./Couontdown";

const ScrollArea = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: scroll;
  width: 100%;
  height: 500px;
`;

const Item = styled.div`
  flex: 0 0 500px;
  margin: 0 10px;
  background-color: #ccc;
`;

const Reservations = (props: any) => {
  return <div>{props.name}</div>;
};

function createItems() {
  const itemsArr = [];
  for (let i = 0; i < 10; i++) {
    itemsArr.push(i);
  }
  return itemsArr;
}

const SlideSection = () => {
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    async function createItems() {
      const reservations = await getReservations();
      await setItems(reservations);
      await console.log(reservations);
    }

    createItems();
  }, [createItems]);

  return (
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
  );
};

export default SlideSection;
