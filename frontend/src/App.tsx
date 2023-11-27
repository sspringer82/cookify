import TokenProvider from './TokenProvider';
import Router from './Router';

function App() {
  return (
    <TokenProvider>
      <Router />
    </TokenProvider>
  );
}

export default App;
