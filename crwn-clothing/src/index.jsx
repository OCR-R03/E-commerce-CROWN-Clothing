import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'

import App from './app/App';
import { UserProvider } from './contexts/user.context'

import './Sass/settings/index.scss'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);