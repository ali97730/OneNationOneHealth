import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
const PrivateScreen =  lazy(()=>import("./components/screens/PrivateScreen"));
const LoginScreen = lazy(()=>import("./components/screens/LoginScreen"));
const RegisterScreen = lazy(()=>import("./components/screens/RegisterScreen"));
const ForgotPasswordScreen = lazy(()=>import("./components/screens/ForgotPasswordScreen"));
const ResetPasswordScreen = lazy(()=>import("./components/screens/ResetPasswordScreen"));
const Card = lazy(()=>import("./components/screens/Card"));
const Details = lazy(()=>import("./components/screens/Details"));

const App = () => {
  return (
    <Router>
      <Suspense  fallback={<div>LoADING.......</div>} className="app">
        <Switch>
          <PrivateRoute exact path="/details/:user_id" component={PrivateScreen} />
          <PrivateRoute exact path="/details/certificate/:user_id" component={Card} />
          <PrivateRoute exact path="/" component={LoginScreen} />
          <Route exact path="/otherUser/:user_id" component={Details} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
          <Route path="/" component={LoginScreen}/>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
