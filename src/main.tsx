import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './app/app';
import OfferList from './app/offer-list/offer-list';
import OverviewMap from './app/overview-map/overview-map';
import { Profile } from './app/profile/profile';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <OverviewMap /> },
      { path: '/list', element: <OfferList /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
