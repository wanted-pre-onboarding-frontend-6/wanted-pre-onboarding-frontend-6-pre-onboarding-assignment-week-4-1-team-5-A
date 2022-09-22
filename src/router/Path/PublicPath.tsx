import { ReactNode } from 'react';
import LoginPage from 'pages/login';
import { RouteObject } from 'react-router';

interface RotuerPathType {
  layout?: ReactNode;
  children?: RouteObject[];
}

const routes = (): Array<RotuerPathType> => [
  {
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
    ],
  },
];
export default routes;