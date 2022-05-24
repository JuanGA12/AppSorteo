import { Dispatch, SetStateAction } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCSVContext } from '../context/csvContext';

interface Participant {
  APELLIDO_Y_NOMBRES: string;
  DOC_IDENTIDAD: string;
  MODALIDAD: string;
  GANO: string;
}
const ENUM = {
  VIRTUAL: '1',
  PRESENCIAL: '2',
  NO_ESTA: '3',
};

const FileModal = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClose = () => setShow(false);
  const { saveData, csv } = useCSVContext();
  const csvToArrayandValidate = (str: string, delimiter = ',') => {
    str = str.replace(/\r/g, '');
    const headers = str.slice(0, str.indexOf('\n')).split(delimiter);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object: any, header, index) {
        object[header] = values[index];
        return object;
      }, {} as Participant);
      return el;
    });
    const newArr = arr.filter((part) => part.MODALIDAD != ENUM.NO_ESTA);
    const arrPres = newArr.filter((part) => part.MODALIDAD == ENUM.PRESENCIAL);
    const arrayToDraw = [...newArr, ...arrPres];
    return arrayToDraw as Array<Participant>;
  };
  const handleChange = (e: any) => {
    const file = e.target.files![0] || false;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const text = e.target.result;
        saveData(csvToArrayandValidate(text));
      };
      reader.readAsText(file);
    }
  };
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
            if (csv) handleClose();
          }}
        >
          Subir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileModal;
