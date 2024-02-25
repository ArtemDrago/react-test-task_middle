import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import Catalog from './components/catalog/Catalog';
import CatalogDetail from './components/catalog/catalogDetail/CatalogDetail';
import {shopContext} from './context/context'
import { getSizes } from './services/api';

export default function App() {
  const [sizes, setSezes] = useState([]);

  const getSizesProduct = useCallback(async () => {
      let sizes = await getSizes();
      if (!!sizes && sizes.length != 0) {
         setSezes(sizes);
      }
  });
  useEffect(() => {
    getSizesProduct();
  },[]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
      children:
          [
            {
              path: "/",
              element: <Catalog type={'catalog'}/>,
            },
            { 
              path: "/:sectionId/:id",
              element: <CatalogDetail />,
            },
            { 
              path: "/basket",
              element: <Catalog type={'basket'} />,
            },
          ]
    },
    {
      path: '/*',
      element: <Navigate to={`/`} />
    }

  ]);
  return (
    <shopContext.Provider
      value={{
        sizes
      }}
    >
      <RouterProvider router={router} />
    </shopContext.Provider>
  )
};
