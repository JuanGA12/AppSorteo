import type { NextPage } from 'next';
import { useState } from 'react';
import FileModal from '../components/FileModal';
import styles from '../styles/Card.module.css';
import ButtonDraw from '../components/ButtonDraw';
import Confetti from '../components/Confetti';

const Home: NextPage = () => {
  const [file, setFile] = useState<Array<string>>();
  const [value, setValue] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [winner, setWinner] = useState<boolean>(false);
  const [fireState, setFireState] = useState<boolean>(false);
  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
  const handleClick = () => {
    setWinner(false);
    setLoading(true);
    const refreshIntervalId = setInterval(() => {
      const randomT = random(0, file!.length - 1);
      setValue(file![randomT]);
    }, 90);
    setTimeout(() => {
      clearInterval(refreshIntervalId);
      setFireState(true);
      setWinner(true);
      setLoading(false);
    }, 5000);
  };
  return (
    <>
      <FileModal file={file} setFile={setFile} />
      <div
        style={{ height: '100vh', width: '100vw' }}
        className="d-flex align-items-center flex-column"
      >
        <h1>Bienvenido al sorteo del innovatón</h1>
        <section className={styles.centerSection}>
          {winner ? (
            <div
              className={styles.modal}
              data-aos={'flip-up'}
              data-aos-easing={'ease-out-cubic'}
            >
              <span className={styles.emoji}>🏆</span>
              <div className={styles.title}>Felicidades, Juan</div>
              <div className={styles.modalbtn}>Ganador</div>
            </div>
          ) : (
            <h2>{value}</h2>
          )}
          <Confetti fireState={fireState} setFireState={setFireState} />
          <ButtonDraw isLoading={isLoading} handleClick={handleClick} />
        </section>
      </div>
    </>
  );
};

export default Home;
