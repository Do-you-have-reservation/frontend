import React from "react";
import styled from "styled-components";

const ReservationSection: React.FC = () => {
  return <ReservationDiv>예약</ReservationDiv>;
};

const ReservationDiv = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  height: 800px;
  justify-content: center;
  align-items: center;
  background-color: yellow;
`;

export default ReservationSection;
