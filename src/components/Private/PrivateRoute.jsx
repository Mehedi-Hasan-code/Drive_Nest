import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../../context/auth/AuthContext';
import Loader from "../common/ui/Loader";

const PrivateRoute = ({ children }) => {
  const {pathname} = useLocation()
  const { user, isUserLoading } = useContext(AuthContext);
  if (isUserLoading) {
    return <Loader />;
  } else {
    if (user) {
      return children;
    } else {
      return <Navigate state={pathname} to="/login" replace />;
    }
  }
};

export default PrivateRoute;