import { Box, Button, Card, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CreateRecipe } from '../shared/types/Recipe';
import { createRecipe } from '../shared/api/recipe.api';
import { useContext, useState } from 'react';
import { tokenContext } from '../TokenProvider';

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [token] = useContext(tokenContext);
  const [error, setError] = useState<string>('');

  async function onSubmit(newRecipe: CreateRecipe) {
    try {
      await createRecipe(newRecipe, token);
      navigate('/list');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('whoops');
      }
    }
  }

  const { register, handleSubmit } = useForm<CreateRecipe>();
  return (
    <Card>
      {error && <Box>{error}</Box>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField label="Titel" variant="standard" {...register('title')} />
        </div>
        <div>
          <Button variant="outlined" type="submit">
            speichern
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/list')}
          >
            abbrechen
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Form;
