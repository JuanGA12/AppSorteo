import { Dispatch, SetStateAction, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCSVContext } from '../context/csvContext';
import styles from '../styles/Modal.module.css';
import styles2 from '../styles/Button.module.css';
import ParticipantI from '../helpers/interfaces/ParticipantI';

const FileModal = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClose = () => setShow(false);
  const { saveData, csv } = useCSVContext();
  const [fileName, setFileName] = useState<string>();
  // const getEmpresa = (id: string) => {
  //   switch (id) {
  //     case '1':
  //       return 'Interbank';
  //     case '2':
  //       return 'Inteligo';
  //     case '3':
  //       return 'Interseguro';
  //   }
  // };
  const getModalidad = (id: string) => {
    switch (id) {
      case '1':
        return 'Streaming';
      case '2':
        return 'Presencial';
      case '3':
        return 'No está';
    }
  };
  const csvToArrayandValidate = (str: string, delimiter = ',') => {
    str = str.replace(/\r/g, '');
    const headers = str.slice(0, str.indexOf('\n')).split(delimiter);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');
    const arr = rows.map((row) => {
      const values = row.split(delimiter);
      const el = headers.reduce((object: any, header, index) => {
        if (header == 'MODO') {
          object[header] = getModalidad(values[index]);
        } else object[header] = values[index];
        return object;
      }, {} as ParticipantI);
      return el;
    });
    const newArr = arr.filter((part) => part.MODO != 'No está');
    const arrPres = newArr.filter((part) => part.MODO == 'Presencial');
    const arrayToDraw = [...newArr, ...arrPres];
    return arrayToDraw as Array<ParticipantI>;
  };
  const handleChange = (e: any) => {
    const file = e.target.files![0] || false;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const text = e.target.result;
        saveData(csvToArrayandValidate(text));
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
  };
  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={() => handleClose()}
      // backdrop="static"
      backdropClassName={styles.modal2}
      contentClassName={styles.modal}
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title className={styles.title}>Sube el archivo CSV</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ padding: '10px 30px' }}>
          <div className={styles.inputTitle}>Archivo CSV</div>
          <div className="d-flex align-items-center">
            <input
              id="inputFile"
              type="file"
              accept=".csv"
              name="inputCSV"
              className={styles.inputFile}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="inputFile" className={styles.labelInput}>
              Seleccionar Archivo
            </label>
            <div className={styles.fileName}>
              {fileName ? fileName : 'Ningun archivo seleccionado'}
            </div>
          </div>
        </div>
        {/* <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Archivo CSV</Form.Label>
            <Form.Control
              type="file"
              accept=".csv"
              autoFocus
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
        </Form> */}
      </Modal.Body>
      <Modal.Footer>
        <button
          className={styles2.button}
          onClick={() => {
            if (csv) handleClose();
          }}
        >
          Subir
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileModal;
