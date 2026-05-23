import logo from './logo.svg';
import Dashboard from './pages/dashboard';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PendingRequests from './pages/pendingRequests';
import PendingRequest from './components/pendingrequest';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./azure/config";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";




function App() {
  
  return (
    
    <BrowserRouter>
      <div className="App"  >

        <Navbar />
        <Switch>
          
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/pendingrequests" component={PendingRequests} />
          <Route exact path="/pendingrequests/:id" component={PendingRequest} />
        </Switch>
      </div>
    </BrowserRouter>
   
  );
}

export default App;
