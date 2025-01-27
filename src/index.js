import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React Strict Mode creates problem to twice rendering on dev envs but not in production (In DEV, React reconfirm if component is rendered by rendering it twice)
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
