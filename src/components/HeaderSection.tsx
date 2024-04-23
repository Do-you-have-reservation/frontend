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
  height: 10%;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 3px;
  border-color: #ece6cc;
  border-style: solid;
  border-width: 3px;
  margin: 4px;
`;

export default HeaderSection;
