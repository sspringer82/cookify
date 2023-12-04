import React, { useContext, useEffect, useState } from 'react';
import { Recipe } from '../shared/types/Recipe';
import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ListItem from './ListItem';
import { tokenContext } from '../TokenProvider';
import { fetchData, removeRecipe } from '../shared/api/recipe.api';

import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const List: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [token] = useContext(tokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(token).then((serverRecipes) => setRecipes(serverRecipes));

    // @todo error handling
  }, [token]);

  async function handleDelete(id: number): Promise<void> {
    if (!confirm('Bist du dir wirklich wirklich wirklich sicher?')) {
      return;
    }
    await removeRecipe(id, token);

    // @todo error handling

    setRecipes((recipes) => {
      return recipes.filter((recipe) => recipe.id !== id);
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell colSpan={2} />
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((recipe) => (
            <ListItem key={recipe.id} recipe={recipe} onDelete={handleDelete} />
          ))}
        </TableBody>
      </Table>
      <Fab
        sx={{ position: 'fixed', right: 30, bottom: 10 }}
        color="secondary"
        onClick={() => navigate('/new')}
      >
        <Add />
      </Fab>
    </TableContainer>
  );
};

export default List;
