import { Box, Button, Card, TextField, Typography } from '@mui/material';
import style from './Login.module.css';
import { useForm } from 'react-hook-form';
import { Credentials } from '../shared/types/Credentials';
import { useContext, useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../TokenProvider';

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [, setToken] = useContext(tokenContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();

  async function doLogin(credentials: Credentials) {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error('there was an error');
      }
      const { token } = await response.json();
      setToken(token);
      setError(false);
      navigate('/list');
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card sx={{ padding: 2 }}>
      <form className={style.form} onSubmit={handleSubmit(doLogin)}>
        <Box sx={{ width: '100%', maxWidth: 500 }}>
          <Typography variant="h1" gutterBottom sx={{ fontSize: 30 }}>
            Melde dich bei Cookify an
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontSize: 15 }}>
            sichere dir die exklusiven Inhalte
          </Typography>
        </Box>

        {loading && (
          <div>
            <PacmanLoader color="#36d7b7" />
          </div>
        )}

        {error && (
          <div style={{ color: 'red' }}>⚠️Anmeldung fehlgeschlagen⚠️</div>
        )}
        <div className={style.formRow}>
          <TextField
            error={!!errors.username}
            helperText={errors.username?.message}
            label="Username"
            variant="standard"
            {...register('username', { required: 'Benutzername angeben' })}
          />
        </div>
        <div className={style.formRow}>
          <TextField
            error={!!errors.password}
            helperText={errors.password?.message}
            label="Passwort"
            type="password"
            variant="standard"
            {...register('password', { required: 'Passwort angeben' })}
          />
        </div>
        <div className={style.formRow}>
          <Button variant="outlined" type="submit">
            anmelden
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
