import ParticipantI from '../helpers/interfaces/ParticipantI';
import styles from '../styles/Card.module.css';

const CardWinner = ({ winner }: { winner: ParticipantI }) => {
  return (
    <div
      className={styles.modal}
      data-aos={'zoom-in'}
      data-aos-easing={'ease-out-cubic'}
    >
      <div style={{ color: '#F5F5F5', fontWeight: '500', fontSize: '40px' }}>
        Ganador
      </div>
      <div className={styles.title}>
        {winner.NOMBRES}
        {' ' + winner.APELLIDOS}
      </div>
      <div className={styles.company}>{winner.EMPRESA}</div>
      <div className={styles.modalidad}>{winner.MODO}</div>
    </div>
  );
};

export default CardWinner;
