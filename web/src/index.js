import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './fonts/Open_Sans/bold.ttf';
import './fonts/Open_Sans/light.ttf';
import './fonts/Open_Sans/regular.ttf';
import './fonts/Open_Sans/italic.ttf';
import './index.css';
import 'siiimple-toast/dist/style.css';

import App from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <HashRouter basename="/">
    <Routes>
      <Route path="/" exact element={<App navTo="home"/>} />
      <Route path="/home" exact element={<App navTo="home"/>} />
      <Route path="/sales" exact element={<App navTo="sales"/>} />
      <Route path="/stock" exact element={<App navTo="stock"/>} />
      <Route path="/invoicing" exact element={<App navTo="invoicing"/>} />
      <Route path="/more" exact element={<App navTo="more"/>} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);
