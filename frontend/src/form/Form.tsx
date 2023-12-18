import { Box, Button, Dialog, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateRecipe, Recipe } from '../shared/types/Recipe';
import { save, fetchRecipeById } from '../shared/api/recipe.api';
import { useContext, useEffect, useState } from 'react';
import { tokenContext } from '../TokenProvider';
import { useAtom } from 'jotai';
import { recipesAtom } from '../shared/atoms/recipes.atom';

const Form: React.FC = () => {
  // const [, setRecipes] = useContext(recipeContext);
  const [, setRecipes] = useAtom(recipesAtom);
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
      newRecipe.caloriesPerPortion = 100;
      newRecipe.difficulty = 'easy';
      newRecipe.preparationDuration = '10 min';
      const serverRecipe = await save(newRecipe, token);

      setRecipes((recipes) => {
        if (editId) {
          return recipes.map((recipe) =>
            recipe.id === parseInt(editId, 10) ? serverRecipe : recipe
          );
        } else {
          return [...recipes, serverRecipe];
        }
      });

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
    <Dialog open={true} onClose={() => navigate('/list')}>
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
    </Dialog>
  );
};

export default Form;
