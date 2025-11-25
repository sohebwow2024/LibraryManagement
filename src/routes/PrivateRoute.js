import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // You can change this as per your login logic
  return token ? children : <Navigate to="/SignIn" replace />;
}
