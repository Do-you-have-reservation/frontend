import React, { useEffect, useState } from "react";
import BlankSection from "./components/BlankSection";
import HeaderSection from "./components/HeaderSection";
import ReservationSection from "./components/ReservationSection";
import SlideSection from "./components/SlideSection";
import Button from "react-bootstrap/Button";
import { IoIosAddCircle } from "react-icons/io";
import AddElderModal from "./components/AddElderModal";
import { speak } from "./utils/tts";

const MassageChairReservationSystem: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [queue, setQueue] = useState<any>([]); // TTS 요청을 저장할 큐
  const [isSpeaking, setIsSpeaking] = useState(false); // 현재 TTS가 진행 중인지 상태

  useEffect(() => {
    if (!isSpeaking && queue.length > 0) {
      // 큐가 비어있지 않고, 현재 말하는 중이 아니라면
      speakAndSetQueue(queue[0]); // 큐의 첫 번째 요소로 TTS 시작
    }
  }, [queue, isSpeaking]); // queue 또는 isSpeaking이 변경될 때마다 실행

  const speakAndSetQueue = async (text: string) => {
    await setIsSpeaking(true);
    await speak(text, window.speechSynthesis);
    await setIsSpeaking(false); // 말하기 종료 후, 상태 변경
    await setQueue((queue: any) => queue.slice(1)); // 큐에서 현재 요소 제거
  };

  const handleAddToQueue = (text: string) => {
    setQueue((queue: any) => [...queue, text]); // 새로운 요소를 큐에 추가
  };

  return (
    <div>
      <HeaderSection></HeaderSection>
      <BlankSection></BlankSection>
      <SlideSection handleAddToQueue={handleAddToQueue}></SlideSection>
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
