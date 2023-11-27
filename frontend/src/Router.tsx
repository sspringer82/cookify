import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import List from './list/List';
import { tokenContext } from './TokenProvider';
import { useContext } from 'react';

type Props = {
  children: React.ReactNode;
};
function IsLoggedIn({ children }: Props) {
  const [token] = useContext(tokenContext);

  if (token === '') {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/list"
          element={
            <IsLoggedIn>
              <List />
            </IsLoggedIn>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
