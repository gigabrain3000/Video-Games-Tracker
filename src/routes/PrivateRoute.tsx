import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  element,
  isAuthenticated,
}: {
  element: ReactElement;
  isAuthenticated: boolean;
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
};
export default PrivateRoute;
