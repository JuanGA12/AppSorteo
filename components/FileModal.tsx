import { Dispatch, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface props {
  file: string[] | undefined;
  setFile: Dispatch<string[] | undefined>;
}
const FileModal = ({ file, setFile }: props) => {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const csvToArrayandValidate = (str: string) => {
    return str.replace(/\r/g, '').split('\n');
  };
  const handleChange = (e: any) => {
    const file = e.target.files![0] || false;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const text = e.target.result;
        setFile(csvToArrayandValidate(text));
      };
      reader.readAsText(file);
    }
  };
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Modal
      centered
      show={show}
      onHide={() => handleClose()}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Sube el archivo CSV</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Archivo CSV</Form.Label>
            <Form.Control
              type="file"
              accept=".csv"
              autoFocus
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            if (file) handleClose();
          }}
        >
          Subir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileModal;
