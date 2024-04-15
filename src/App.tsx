import React, { useState } from "react";
import BlankSection from "./components/BlankSection";
import HeaderSection from "./components/HeaderSection";
import ReservationSection from "./components/ReservationSection";
import SlideSection from "./components/SlideSection";
import Button from "react-bootstrap/Button";
import { IoIosAddCircle } from "react-icons/io";

const MassageChairReservationSystem: React.FC = () => {
  return (
    <div>
      <HeaderSection></HeaderSection>
      <BlankSection></BlankSection>
      <SlideSection></SlideSection>
      <ReservationSection></ReservationSection>
      <Button
        variant="outlined"
        size="lg"
        color="default"
        style={{
          float: "right",
          position: "fixed",
          right: "20px",
          bottom: "20px",
          zIndex: "1000",
        }}
      >
        <IoIosAddCircle color="orange" size={150} />
      </Button>
    </div>
  );
};

export default MassageChairReservationSystem;
