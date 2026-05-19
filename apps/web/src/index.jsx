import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';

axios.defaults.withCredentials = true;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
