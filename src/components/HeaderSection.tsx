import React, { useState } from "react";
import styled from "styled-components";

const HeaderSection: React.FC = () => {
  return (
    <Header>
      <h3>숲속재활어르신재가복지센터</h3>
      <h1>안마기 예약 시스템</h1>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  background-color: green;
`;

export default HeaderSection;
