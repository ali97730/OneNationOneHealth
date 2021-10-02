import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import Card from "./components/screens/Card";
import Details from "./components/screens/Details";

const App = () => {
  return (
    <Router>
      <div className="app">
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
      </div>
    </Router>
  );
};

export default App;
