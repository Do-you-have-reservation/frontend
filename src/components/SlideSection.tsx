import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CountdownApp from "./Couontdown";

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

function createItems() {
  const itemsArr = [];
  for (let i = 0; i < 10; i++) {
    itemsArr.push(i);
  }
  return itemsArr;
}

const SlideSection = () => {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    function createItems() {
      const itemsArr = [];
      for (let i = 0; i < 10; i++) {
        itemsArr.push(i);
      }
      setItems(itemsArr);
    }

    createItems();
  }, [createItems]);

  return (
    <ScrollArea>
      {items.map((index) => {
        return (
          <Item key={index}>
            <CountdownApp />
          </Item>
        );
      })}
      <Item style={{ backgroundColor: "red" }} /> {/* 상단 고정 사각형 */}
    </ScrollArea>
  );
};

export default SlideSection;
