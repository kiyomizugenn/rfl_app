import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector, selectUser } from "../features/userSlice";

function PrivateRoute({ ...props }) {
  // const isAuth = useSelector(isAuthSelector);
  const user = useSelector(selectUser);
  return user.uid ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
