import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import SidebarLayout from './layouts/SidebarLayout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ListTeamsView, { loader as teamsLoader } from './contents/Teams/List.tsx'
import MembersView, { loader as membersLoader } from './contents/Members.tsx'
import GamesView, { loader as gamesLoader } from './contents/Games/List.tsx';
import CreateGameView, { loader as createGameLoader } from './contents/Games/Ceate.tsx'
import VotesView from './contents/Votes.tsx'
import CreateTeamView from './contents/Teams/Create.tsx'
import DetailTeamView, { loader as teamDetailLoader } from './contents/Teams/Detail.tsx'
import EditTeamView from './contents/Teams/Edit.tsx'

// import * as bootstrap from "bootstrap";

const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    errorElement: <SidebarLayout><h1>Not Found</h1></SidebarLayout>,
    children: [
      {
        path: '',
        element: <ListTeamsView />,
        loader: teamsLoader,
      },
      {
        path: '/teams',
        element: <ListTeamsView />,
        loader: teamsLoader,
      },
      {
        path: '/teams/new',
        element: <CreateTeamView />,
      },
      {
        path: '/teams/:teamId',
        element: <DetailTeamView />,
        loader: teamDetailLoader,
      },
      {
        path: '/teams/:teamId/edit',
        element: <EditTeamView />,
        loader: teamDetailLoader,
      },
      {
        path: '/members',
        element: <MembersView />,
        loader: membersLoader,
      },
      {
        path: '/teams/:teamId/members',
        element: <MembersView />,
        loader: membersLoader,
      },
      {
        path: '/games',
        element: <GamesView />,
        loader: gamesLoader,
      },
      {
        path: '/games/new',
        element: <CreateGameView />,
        loader: createGameLoader,
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
