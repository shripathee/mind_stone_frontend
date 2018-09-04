import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import history from './history';

ReactDOM.render(
  <Router history={history}>
    <App/>
  </Router>, document.getElementById('root'));
registerServiceWorker();
