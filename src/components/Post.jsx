import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase/index";
import styles from "./module.css/Post.module.css";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar, StylesProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Messageicon from "@material-ui/icons";
import SendIcon from "@material-ui/icons";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { green, red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    position: "relative",
    borderRadius: "12px",
  },
  title: {
    display: "flex",
    fontSize: "20px",
    flexDirection: "column",
    flexWrap: "wrap",
    padding: "0 0 0 15px",
  },
  CardContent: {
    padding: "5px 0 0 15px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[300],
  },
}));

export const Post = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [category, setCategory] = useState("");

  const categoryCheck = () => {
    const category = props.category;
    switch (category) {
      case "frontend":
        setCategory("#フロントエンドエンジニア");
        break;
      case "backend":
        setCategory("#バックエンドエンジニア");
        break;
      case "infra":
        setCategory("#インフラエンジニア");
        break;
      default:
        setCategory("#デザイナー");
        console.log(category);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    categoryCheck();
  }, []);

  return (
    <div className={styles.post}>
      <div className={styles.post_items}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} src={props.avatar}></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={props.username}
            subheader={new Date(props.timestamp?.toDate()).toLocaleString()}
          />
          <Typography className={classes.title} variant="h5" component="h3">
            {props.title}
          </Typography>
          <CardContent className={classes.CardContent}></CardContent>
          <CardActions disableSpacing className={styles.post_card}>
            <Typography variant="body1" color="textSecondary" component="p">
              {category}
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Content <br /> {props.content}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
};
export default Post;
