import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import Administracija from './components/Administracija.jsx'
import Predavaci from './components/Predavaci.jsx'
import Radionice from './components/Radionice.jsx'
import { AdminProvider } from './components/AdminContext.jsx'
import NovaRadionica from "./components/NovaRadionica.jsx";
import UrediRadionicu from "./components/UrediRadionicu.jsx";
import './index.css'
import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'
import RadionicePredavaca from './components/RadionicePredavaca.jsx';
import NoviPredavac from './components/NoviPredavac.jsx';
import UrediPredavaca from './components/UrediPredavaca.jsx';
import NovaOrganizacija from './components/NovaOrganizacija.jsx';

const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      children: [
          {
              path: '/',
              element: <Radionice />,
          },
          {
              path: '/predavaci',
              element: <Predavaci />,
          },
          {
              path: '/administracija',
              element: <Administracija />,
          },
          {
            path: '/dodajradionicu',
            element: <NovaRadionica />,
          },
          {
            path: '/urediradionicu/:id',
            element: <UrediRadionicu />,
          },
          {
            path: '/radionice/:ime',
            element: <RadionicePredavaca />,
          },
          {
            path: '/dodajpredavaca',
            element: <NoviPredavac />,
          },
          {
            path: '/uredipredavaca/:id',
            element: <UrediPredavaca />,
          },
          {
            path: '/dodajorganizaciju',
            element: <NovaOrganizacija />,
          },
      ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <RouterProvider router={router}>
        <App/>
      </RouterProvider>
    </AdminProvider>
  </React.StrictMode>
)
