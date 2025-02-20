import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Loader from "../../components/Loader";

export default function PrivateRoute() {
  const location = useLocation();

  const { user, loading } = useContext(AuthContext);
  // console.log({user, looder});

  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
  }

  return children;
}
