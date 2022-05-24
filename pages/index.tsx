import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Page.module.css';
import ButtonDraw from '../components/ButtonDraw';
import Confetti from '../components/Confetti';
import CardWinner from '../components/CardWinner';
import { useCSVContext } from '../context/csvContext';
import FileModal from '../components/FileModal';
import { BsCloudUpload } from 'react-icons/bs';

interface Participant {
  APELLIDO_Y_NOMBRES: string;
  DOC_IDENTIDAD: string;
  MODALIDAD: string;
  GANO: string;
}
const Home: NextPage = () => {
  // const [file, setFile] = useState<Array<Participant>>();
  const { saveData, csv } = useCSVContext();
  const [winner, setWinner] = useState<Participant>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const [fireState, setFireState] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
  const handleClick = () => {
    setResult(false);
    setLoading(true);
    const newArr = csv!.filter((part) => part.GANO == 'NO');
    let randomT: number;
    const refreshIntervalId = setInterval(() => {
      randomT = random(0, newArr.length - 1);
      setWinner(newArr[randomT]);
    }, 90);
    setTimeout(() => {
      clearInterval(refreshIntervalId);
      setFireState(true);
      setResult(true);
      setLoading(false);
      const arr = [...newArr];
      arr[randomT].GANO = 'SI';
      saveData(arr);
    }, 5000);
  };

  return (
    <>
      <FileModal show={show} setShow={setShow} />
      <div className={styles.pageContainer}>
        <h1>Bienvenido al sorteo de la innovatón</h1>
        <section className={styles.centerSection}>
          {result ? (
            <CardWinner winner={winner as Participant} />
          ) : (
            <h2>{winner?.APELLIDO_Y_NOMBRES}</h2>
          )}
          <Confetti fireState={fireState} setFireState={setFireState} />
          <ButtonDraw
            isLoading={isLoading}
            handleClick={() => {
              if (csv) handleClick();
            }}
          />
        </section>
        <div className={styles.icon} onClick={() => setShow(true)}>
          <BsCloudUpload size={30} />
        </div>
      </div>
    </>
  );
};

export default Home;
