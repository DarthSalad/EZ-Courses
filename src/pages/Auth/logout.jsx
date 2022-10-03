import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, token } from "../../api/auth.api";
import Notifications from "../../components/Notifications/Notifications";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  useEffect(() => {
    async function logout() {
      auth &&
        await axios({
          method: 'delete',
          url: 'http://localhost:5000/api/auth/logout',
          withCredentials: true,
          headers: {authorization: token}
        }).then(() => {
          navigate("/login");
        }).catch((e) => {
          Notifications("There was an error", e.message);
        });
    }

    logout();
  }, [auth, navigate]);

  return <div>logout successful</div>;
};

export default Logout;