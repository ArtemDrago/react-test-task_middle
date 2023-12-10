import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import Catalog from './components/catalog/Catalog';
import CatalogDetail from './components/catalog/catalogDetail/CatalogDetail';
import MainPageContent from './components/MainPage/MainPageContent/MainPageContent';

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
      children:
          [
            {
              path: "/",
              element: <MainPageContent />,
            },
            {
              path: "/catalog",
              element: <Catalog type={'catalog'}/>,
            },
            { 
              path: "/catalog/:sectionId/:id",
              element: <CatalogDetail />,
            },
          ]
    },
    {
      path: '/*',
      element: <Navigate to={`/`} />
    }

  ]);
  return (
    <RouterProvider router={router} />
  )
};
