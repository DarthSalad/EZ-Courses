import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../api/auth.api";
import Load from "../Load/Load";

const Protected = ({ children }) => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <Load></Load>;
  }

  if (auth) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protected;
