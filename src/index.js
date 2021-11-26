import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import './index.scss'
import { Provider } from 'react-redux';
import store from './store/store.js';
import { CookiesProvider } from 'react-cookie';


ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);