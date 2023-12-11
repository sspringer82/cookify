import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import List from './list/List';
import { tokenContext } from './TokenProvider';
import { useContext } from 'react';
import Form from './form/form';

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
        >
          <Route path="new" element={<Form />} />
          <Route path="edit/:id" element={<Form />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
