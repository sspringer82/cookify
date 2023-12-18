import React, { useContext, useEffect, useState } from 'react';
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
import { Outlet, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { recipesAtom } from '../shared/atoms/recipes.atom';

const List: React.FC = () => {
  const [recipes, setRecipes] = useAtom(recipesAtom);
  const [token] = useContext(tokenContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.addEventListener('open', () => {
      console.log('socket ready');
    });

    socket.addEventListener('error', (event) => {
      console.log(event);
    });

    socket.addEventListener('message', (event) => {
      setRecipes((recipes) => [...recipes, JSON.parse(event.data)]);
    });

    return () => {
      socket.close();
    };
  }, [setRecipes]);

  useEffect(() => {
    fetchData(token)
      .then((serverRecipes) => setRecipes(serverRecipes))
      .catch(() => {
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
    <TableRow key={null}>
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
      <Outlet />
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
        onClick={() => navigate('/list/new')}
      >
        <Add />
      </Fab>
    </TableContainer>
  );
};

export default List;
