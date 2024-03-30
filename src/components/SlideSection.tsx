import styled from "styled-components";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import DraggableScroller from "./DraggableScroller";

interface Item {
  id: number;
  content: string; // 사각형 내부에 표시될 내용
}

const SlideSection: React.FC = () => {
  const [items, setItems] = useState([{ id: 1, content: "Item 1" }]); // 초기 아이템 예시

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      content: `Item ${items.length + 1}`,
    };
    setItems([...items, newItem]);
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  return (
    <DraggableScroller style={customStyle}>
      {[...Array(5)].map((item, index) => (
        <CardItem key={index} onClick={handleClick} />
      ))}
    </DraggableScroller>
  );
};

const SlideDiv = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  background-color: pink;
`;
export default SlideSection;
