import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Page.module.css';
import ButtonDraw from '../components/ButtonDraw';
import Confetti from '../components/Confetti';
import CardWinner from '../components/CardWinner';
import { useCSVContext } from '../context/csvContext';
import FileModal from '../components/FileModal';
import { BsCloudUpload } from 'react-icons/bs';
import ParticipantI from '../helpers/interfaces/ParticipantI';

const Home: NextPage = () => {
  // const [file, setFile] = useState<Array<Participant>>();
  const { saveData, csv } = useCSVContext();
  const [winner, setWinner] = useState<ParticipantI>();
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
        <picture style={{ zIndex: '2' }}>
          <img src="/header.png" alt="" draggable={false} />
        </picture>
        <h1
          className={styles.pageTitle}
          style={{ marginTop: '40px', zIndex: '2' }}
        >
          SORTEO INNOVATÓN 2022
        </h1>
        <section className={styles.centerSection}>
          {result ? (
            <CardWinner winner={winner as ParticipantI} />
          ) : (
            <h2 style={{ color: '#43E987' }}>
              {winner?.NOMBRES}
              {winner ? ' ' : ''} {winner?.APELLIDOS}
            </h2>
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
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.686554 22.4885H25.3134V25.5669L0.686554 25.5671V22.4885ZM14.533 6.82602V20.1571H11.4667V6.82602L7.8557 10.4372L5.67934 8.26086L12.9999 0.940308L20.3204 8.26086L18.1441 10.4372L14.533 6.82602Z"
              fill="#43E987"
            />
          </svg>
        </div>
        <picture className={styles.hand}>
          <img
            src="/hand.png"
            style={{ height: '100vh' }}
            alt=""
            draggable={false}
          />
        </picture>
        <picture className={styles.footer}>
          <img
            src="/footer.png"
            style={{ width: '100vw' }}
            alt=""
            draggable={false}
          />
        </picture>
      </div>
    </>
  );
};

export default Home;
