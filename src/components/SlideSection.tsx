import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { style } from "../../node_modules/postcss-minify-font-values/types/lib/keywords.d";

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

const SlideSection = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const generateItems = () => {
      const itemsArr = [];
      for (let i = 0; i < 10; i++) {
        itemsArr.push(
          <Item key={i}>
            <div
              style={{ width: "100%", height: "50px", backgroundColor: "blue" }}
            >
              안녕하세요
            </div>
            <div
              style={{
                width: "100%",
                height: "50px",
                marginTop: "5px",
                backgroundColor: "blue",
              }}
            >
              안녕하세요
            </div>
            <div
              style={{
                width: "100%",
                height: "50px",
                marginTop: "5px",
                backgroundColor: "blue",
              }}
            >
              안녕하세요
            </div>
            <div
              style={{
                width: "100%",
                height: "50px",
                marginTop: "5px",
                backgroundColor: "blue",
              }}
            >
              안녕하세요
            </div>
            <div
              style={{
                width: "100%",
                height: "50px",
                marginTop: "5px",
                backgroundColor: "blue",
              }}
            >
              안녕하세요
            </div>
            <div
              style={{
                width: "100%",
                height: "50px",
                marginTop: "5px",
                backgroundColor: "blue",
              }}
            >
              안녕하세요
            </div>
          </Item>
        );
      }
      setItems(itemsArr);
    };

    generateItems();
  }, [items]);

  return (
    <ScrollArea>
      {items}
      <Item style={{ backgroundColor: "red" }} /> {/* 상단 고정 사각형 */}
    </ScrollArea>
  );
};

export default SlideSection;
