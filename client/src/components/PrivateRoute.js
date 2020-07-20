import React from 'react';
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
        {...rest}
        render={props => {
            if (localStorage.getItem("token")) {
              // when token is in localStorage, render the given component
              return <Component {...props} />;
            } else {
              // redirect to login
              console.log("redirecting!");
              return <Redirect to="/login" />;
            }
          }}
        />
      );
    };
    
    export default PrivateRoute;
