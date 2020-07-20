import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProtectedRoute from './components/PrivateRoute';
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from './components/BubblePage';
import ColorList from  'components/ColorList';
function App() {

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <ProtectedRoute exact path='/bubbles' component={BubblePage} />

        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
