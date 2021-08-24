import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useState, useEffect } from "react";
import { auth } from "../firebase";

function PrivateRoute({ children, ...props }) {
  const user = useSelector(selectUser);
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthChecked(true);
      }
    });
  }, []);

  return (
    <Route
      {...props}
      render={() => {
        if (authChecked) {
          if (user.uid) {
            return children;
          } else {
            return <Redirect to="/login" />;
          }
        }
      }}
    />
  );
}
export default PrivateRoute;
