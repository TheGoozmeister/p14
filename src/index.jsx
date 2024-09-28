import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouter from './components/Router';
import "./style/style.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </Provider>
);

