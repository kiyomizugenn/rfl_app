import React, { useEffect } from "react";
import styles from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase/index";
import { Home } from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRouter";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import { render } from "@testing-library/react";
import PostForm from "./components/PostForm";
import Header from "./components/Header";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
      return () => {
        unSub();
      };
    });
  }, [dispatch]);
  // 初回レンダリング、マウントする時のみ実行される。
  // クリーンナップ関数は実行されていない。

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/Post" component={PostForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
