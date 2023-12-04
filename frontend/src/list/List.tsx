import React, { useContext, useEffect, useState } from 'react';
import { Recipe } from '../shared/types/Recipe';
import {
  Fab,
  Paper,
  Snackbar,
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
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData(token)
      .then((serverRecipes) => setRecipes(serverRecipes))
      .catch((loadError) => {
        setError('Fehler beim Laden der Daten');
      });
  }, [token]);

  async function handleDelete(id: number): Promise<void> {
    if (!confirm('Bist du dir wirklich wirklich wirklich sicher?')) {
      return;
    }
    try {
      await removeRecipe(id, token);

      setRecipes((recipes) => {
        return recipes.filter((recipe) => recipe.id !== id);
      });
    } catch (removeError) {
      setError('Fehler beim Löschen!');
    }
  }

  let content = [
    <TableRow>
      <TableCell colSpan={4}>Keine Daten vorhanden</TableCell>
    </TableRow>,
  ];

  if (recipes.length > 0) {
    content = recipes.map((recipe) => (
      <ListItem key={recipe.id} recipe={recipe} onDelete={handleDelete} />
    ));
  }

  return (
    <TableContainer component={Paper}>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6_000}
          message={error}
          onClose={() => setError('')}
        />
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell colSpan={2} />
          </TableRow>
        </TableHead>
        <TableBody>{content}</TableBody>
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
