import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Spin } from "antd";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = Meteor.userId() !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
