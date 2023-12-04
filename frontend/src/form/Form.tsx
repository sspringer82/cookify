import { Box, Button, Card, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateRecipe, Recipe } from '../shared/types/Recipe';
import { save, fetchRecipeById } from '../shared/api/recipe.api';
import { useContext, useEffect, useState } from 'react';
import { tokenContext } from '../TokenProvider';

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [token] = useContext(tokenContext);
  const [error, setError] = useState<string>('');
  const { id: editId } = useParams<{ id: string }>();
  const { register, handleSubmit, reset } = useForm<CreateRecipe | Recipe>();

  useEffect(() => {
    if (editId) {
      fetchRecipeById(editId, token).then((recipeFromServer) =>
        reset(recipeFromServer)
      );
    }
  }, [editId, token, reset]);

  async function onSubmit(newRecipe: CreateRecipe | Recipe) {
    try {
      await save(newRecipe, token);
      navigate('/list');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('whoops');
      }
    }
  }

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
