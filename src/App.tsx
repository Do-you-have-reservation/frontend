import React, { useEffect, useState } from "react";
import BlankSection from "./components/BlankSection";
import HeaderSection from "./components/HeaderSection";
import ReservationSection from "./components/ReservationSection";
import SlideSection from "./components/SlideSection";
import Button from "react-bootstrap/Button";
import { IoIosAddCircle } from "react-icons/io";
import AddElderModal from "./components/AddElderModal";
import { speak } from "./utils/tts";
import { Props } from "./interfaces/Queue.interface";
import { ToastContainer } from "react-toastify";

const MassageChairReservationSystem: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [queue, setQueue] = useState<any>([]); // TTS 요청을 저장할 큐
  const [isSpeaking, setIsSpeaking] = useState(false); // 현재 TTS가 진행 중인지 상태

  useEffect(() => {
    if (!isSpeaking && queue.length > 0) {
      setIsSpeaking(true);
      speakAndSetQueue(queue[0]);
    }
  }, [queue, isSpeaking]);

  const speakAndSetQueue = async (text: string) => {
    await speak(text, window.speechSynthesis, setIsSpeaking);
    await setQueue((queue: any) => queue.slice(1)); // 큐에서 현재 요소 제거
    await new Promise((resolve) => setTimeout(resolve, 3000));
  };

  function handleAddToQueue(text: string) {
    setQueue((queue: any) => [...queue, text]); // 새로운 요소를 큐에 추가
  }

  return (
    <div>
      <HeaderSection></HeaderSection>
      <BlankSection></BlankSection>
      <SlideSection handleAddToQueue={handleAddToQueue}></SlideSection>
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
      <ToastContainer />
    </div>
  );
};

export default MassageChairReservationSystem;
