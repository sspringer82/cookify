import React, { useContext, useEffect, useState } from 'react';
import { Recipe } from '../shared/types/Recipe';
import {
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
import { useNavigate } from 'react-router-dom';

const List: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [token] = useContext(tokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === '') {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/recipes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setRecipes(data);
    }

    fetchData();
  }, []);

  async function handleDelete(id: number): Promise<void> {
    const response = await fetch('/api/recipes/' + id, {
      method: 'DELETE',
    });

    if (response.ok) {
      setRecipes((recipes) => {
        return recipes.filter((recipe) => recipe.id !== id);
      });
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((recipe) => (
            <ListItem key={recipe.id} recipe={recipe} onDelete={handleDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
