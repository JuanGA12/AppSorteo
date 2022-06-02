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
      <div style={{ color: '#F5F5F5', fontWeight: '500', fontSize: '40px' }}>
        Ganador
      </div>
      <div className={styles.title}>{winner.APELLIDO_Y_NOMBRES}</div>
    </div>
  );
};

export default CardWinner;
