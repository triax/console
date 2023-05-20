import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import SidebarLayout from './layouts/SidebarLayout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import TeamsView from './contents/Teams.tsx'
import MembersView, { loader as membersLoader } from './contents/Members.tsx'
import GamesView from './contents/Games.tsx';
import VotesView from './contents/Votes.tsx'

// import * as bootstrap from "bootstrap";

const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    errorElement: <h1>Not Found</h1>,
    children: [
      {
        path: '',
        element: <TeamsView />,
      },
      {
        path: '/teams',
        element: <TeamsView />,
      },
      {
        path: '/members',
        element: <MembersView />
      },
      {
        path: '/teams/:teamId/members',
        element: <MembersView />,
        loader: membersLoader,
      },
      {
        path: '/games',
        element: <GamesView />,
      },
      {
        path: '/votes',
        element: <VotesView />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
