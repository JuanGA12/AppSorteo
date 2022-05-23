import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
interface props {
  isLoading: boolean;
  handleClick: () => void;
}
const ButtonDraw = ({ isLoading, handleClick }: props) => {
  return (
    <Button
      size="lg"
      variant={isLoading ? 'outline-secondary' : 'success'}
      disabled={isLoading}
      onClick={handleClick}
    >
      <div className="d-flex">
        <span>{!isLoading ? '🎉 Sortear 🎉' : 'Sorteando'}</span>
        {isLoading && (
          <div className="mx-2">
            <Spinner
              as="span"
              animation="grow"
              variant="dark"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <Spinner
              as="span"
              animation="grow"
              variant="dark"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <Spinner
              as="span"
              animation="grow"
              variant="dark"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </Button>
  );
};

export default ButtonDraw;
