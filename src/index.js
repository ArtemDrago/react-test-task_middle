import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';

import App from './App';
import { Provider } from 'react-redux';
import store from './store';

import './styles/index.css'

const rootView = document.getElementById('root');
const root = createRoot(rootView);

if (!!root) {
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  )
};
