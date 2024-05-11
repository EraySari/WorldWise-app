import { useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/FalseAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = UseAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : "";
}

export default ProtectedRoute;
