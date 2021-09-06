import { Redirect, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        // localStorage.getItem("authToken") 
        1 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
