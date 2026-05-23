import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootreducer from './reducers/rootreducer';
import thunk from 'redux-thunk';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./azure/config";



const msalInstance = new PublicClientApplication(msalConfig);
const store= createStore(rootreducer,applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
    <MsalProvider instance={msalInstance}>

    <App />
    </MsalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
