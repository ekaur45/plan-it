import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './assets/css/animate.css';
import './assets/css/LineIcons.css';
import './assets/css/bootstrap.min.css';
import './assets/css/default.css';
import './assets/css/style.css';

import './index.css';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import defaultStore from './stores/default-store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Provider store={defaultStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();