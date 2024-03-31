import React, { useState } from "react";
import BlankSection from "./components/BlankSection";
import HeaderSection from "./components/HeaderSection";
import ReservationSection from "./components/ReservationSection";
import SlideSection from "./components/SlideSection";

const MassageChairReservationSystem: React.FC = () => {
  return (
    <div>
      <HeaderSection></HeaderSection>
      <BlankSection></BlankSection>
      <SlideSection></SlideSection>
      <ReservationSection></ReservationSection>
    </div>
  );
};

export default MassageChairReservationSystem;
