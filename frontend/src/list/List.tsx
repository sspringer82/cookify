import React, { useEffect, useState } from 'react';
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

const List: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api');
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setRecipes(data);
    }

    fetchData();
  }, []);

  async function handleDelete(id: number): Promise<void> {
    // lösche den Datensatz aus dem State
    setRecipes((recipes) => {
      return recipes.filter((recipe) => recipe.id !== id);
    });
    // lösche den Datensatz auf dem Server
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
