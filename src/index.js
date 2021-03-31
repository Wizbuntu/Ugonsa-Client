import React from 'react';
import { render } from 'react-snapshot';

// react router dom
import {BrowserRouter} from 'react-router-dom'


import App from './App';

render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

