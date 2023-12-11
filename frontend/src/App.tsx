import TokenProvider from './TokenProvider';
import Router from './Router';
import { RecipeProvider } from './shared/components/RecipeProvider';

function App() {
  return (
    <TokenProvider>
      <RecipeProvider>
        <Router />
      </RecipeProvider>
    </TokenProvider>
  );
}

export default App;
