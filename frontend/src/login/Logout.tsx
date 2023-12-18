import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../TokenProvider';
import { Button } from '@mui/material';

const Logout: React.FC = () => {
  const [, setToken] = useContext(tokenContext);
  const navigate = useNavigate();

  function doLogout() {
    setToken('');
    navigate('/');
  }

  return (
    <Button
      sx={{ position: 'absolute', top: 10, right: 10 }}
      onClick={() => doLogout()}
    >
      logout
    </Button>
  );
};

export default Logout;
