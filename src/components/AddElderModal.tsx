import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addElder } from "../firebaseConfig";
interface AddElderModalProps {
  show: boolean;
  handleClose: () => void;
}
function AddElderModal({ show, handleClose }: AddElderModalProps) {
  const [name, setName] = useState("");

  const handleMessageChange = (e: any) => {
    setName(e.target.value);
  };

  async function addElderWithName(name: string) {
    await addElder(name);
    await handleClose();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>어르신 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>어르신 이름을 입력하세요.</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleMessageChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={() => addElderWithName(name)}>
            추가
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddElderModal;
