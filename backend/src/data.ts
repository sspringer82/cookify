import { Recipe } from './types/Recipe';

export const data = [
  {
    id: 1,
    title: 'Chicken Curry',
    ingredients: [
      { name: 'Salt', quantity: '1 tsp' },
      { name: 'Chicken', quantity: '2 pieces' },
      { name: 'Curry Powder', quantity: '1 tbsp' },
    ],
    preparationSteps: ['Marinate chicken', 'Cook rice', 'Mix curry'],
    caloriesPerPortion: 400,
    toolsRequired: ['Knife', 'Pan', 'Spatula'],
    difficulty: 'medium',
    preparationDuration: '30min',
    rating: 4,
  },
  {
    id: 2,
    title: 'Vegan Salad',
    ingredients: [
      { name: 'Lettuce', quantity: '1 head' },
      { name: 'Tomato', quantity: '1' },
      { name: 'Cucumber', quantity: '1' },
    ],
    preparationSteps: ['Chop veggies', 'Mix dressing', 'Combine'],
    caloriesPerPortion: 200,
    toolsRequired: ['Knife', 'Bowl', 'Fork'],
    difficulty: 'easy',
    preparationDuration: '10min',
    rating: 3,
  },
] as any as Recipe[];
