import { useEffect, useState } from 'react';
import { Recipe } from '../shared/types/Recipe';

const List: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    fetch('/api')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe) => {
          return (
            <tr>
              <td>{recipe.id}</td>
              <td>{recipe.title}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
