import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import Create from './components/Create'
import 'bootstrap/dist/css/bootstrap.min.css';
import Update from './components/Update';

function App() {
  return (

    <div>

      <Router>
      <Switch >
        
        <Route exact path="/" component={Admin}/>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/projects/create" component={Create} />
        <Route exact path="/projects/update/:projectId/:projectName" component={Update} />
        
        <Route  path="*" component={Error} />
        </Switch>
        
        
      </Router>
    </div>
  );
}

export default App;
