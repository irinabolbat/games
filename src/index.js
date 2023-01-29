import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, HashRouter} from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWokerRegistrarion";

const root = ReactDOM.createRoot(document.getElementById('root'));
const Router = process.env.NODE_ENV === 'development'
    ? BrowserRouter
    : HashRouter
root.render(
    <Router>
        <App/>
    </Router>
);

serviceWorkerRegistration.register();
