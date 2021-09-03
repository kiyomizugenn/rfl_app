import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HeaderRight from "./HeaderRight";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(7),
    textDecoration: "none",
    fontSize: "25px",
    color: "#ffffff",
    "&:hover": {
      textDecoration: "none",
      opacity: "0.5",
    },
  },
  header: {
    width: "95%",
  },
  headerRight: {
    margin: "0 0 0 auto",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate(update ? false : true);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.header}>
          <div>
            <Link to="/" className={classes.title}>
              Reactive
            </Link>
          </div>
          <div className={classes.headerRight}>
            <HeaderRight />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
