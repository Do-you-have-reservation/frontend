import React, { useState } from "react";
import BlankSection from "./components/BlankSection";
import HeaderSection from "./components/HeaderSection";
import ReservationSection from "./components/ReservationSection";
import SlideSection from "./components/SlideSection";
import Button from "react-bootstrap/Button";
import { IoIosAddCircle } from "react-icons/io";
import AddElderModal from "./components/AddElderModal";

const MassageChairReservationSystem: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
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
        onClick={handleShowModal}
      >
        <IoIosAddCircle color="orange" size={150} />
      </Button>
      <AddElderModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default MassageChairReservationSystem;
