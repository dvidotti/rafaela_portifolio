import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './fonts/Graphik-Font-Family/GraphikRegular.otf'
import './fonts/Graphik-Font-Family/GraphikBold.otf'
import './fonts/Graphik-Font-Family/GraphikLight.otf'
import './fonts/Graphik-Font-Family/GraphikMedium.otf'
import './fonts/Graphik-Font-Family/GraphikSemibold.otf'
import './fonts/Graphik-Font-Family/GraphikThin.otf'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
