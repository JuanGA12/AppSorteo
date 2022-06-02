import Spinner from 'react-bootstrap/Spinner';
import styles from '../styles/Button.module.css';
interface props {
  isLoading: boolean;
  handleClick: () => void;
}
const ButtonDraw = ({ isLoading, handleClick }: props) => {
  return (
    <button
      className={styles.button}
      disabled={isLoading}
      onClick={handleClick}
    >
      <div className="d-flex">
        <span>{!isLoading ? 'SORTEAR' : 'SORTEANDO'}</span>
      </div>
    </button>
  );
};

export default ButtonDraw;
