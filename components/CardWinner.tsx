import styles from '../styles/Card.module.css';
interface Participant {
  APELLIDO_Y_NOMBRES: string;
  DOC_IDENTIDAD: string;
  MODALIDAD: string;
  GANO: string;
}
const CardWinner = ({ winner }: { winner: Participant }) => {
  return (
    <div
      className={styles.modal}
      data-aos={'zoom-in'}
      data-aos-easing={'ease-out-cubic'}
    >
      <span className={styles.emoji}>🏆</span>
      <div className={styles.title}>{winner.APELLIDO_Y_NOMBRES}</div>
      <div className={styles.modalbtn}>Ganador</div>
    </div>
  );
};

export default CardWinner;
