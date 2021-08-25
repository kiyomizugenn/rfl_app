import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase/index";
import styles from "./module.css/Post.module.css";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useHistory } from "react-router";
import { Avatar, StylesProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Messageicon from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    position: "relative",
    borderRadius: "12px",
  },
  title: {
    display: "flex",
    fontSize: "18px",
    flexDirection: "column",
    flexWrap: "wrap",
    paddingLeft: "10px",
    fontWeight: 550,
  },
  CardContent: {
    paddingBottom: "7px",
    borderRadius: "12px",
    border: "solid 1px #555555",
    height: "25px",
    lineHeight: "25px",
    paddingLeft: "5px",
    paddingRight: "5px",
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

  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(2),
    margin: "5px",
  },
}));

export const Post = (props) => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [expanded, setExpanded] = React.useState(false);
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [comments, setComments] = useState([
    {
      id: "",
      avatar: "",
      text: "",
      username: "",
      timestamp: null,
    },
  ]);

  const newComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(props.postId).collection("comments").add({
      avatar: user.photoURL,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
    });
    setComment("");
  };
  const categoryCheck = () => {
    const category = props.category;
    switch (category) {
      case "rock":
        setCategory("#ROCK/POPS");
        break;
      case "r&b":
        setCategory("#R&B/SOUL");
        break;
      case "hardrock":
        setCategory("#HARD ROCK");
        break;
      case "heabymetal":
        setCategory("#HEABY METAL");
      case "blues":
        setCategory("#BLUES");
        break;
      case "jazz":
        setCategory("#JAZZ");
        break;
      case "fusion":
        setCategory("#FUSION");
        break;
      case "jpop":
        setCategory("#JPOP");
        break;
      default:
        break;
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const deletePost = () => {
    db.collection("posts")
      .doc(props.postId)
      .delete()
      .then(() => {
        console.log("削除成功！！");
        window.location.reload();
      })
      .catch(() => console.log("削除失敗!!"));
  };

  useEffect(() => {
    categoryCheck();
  }, []);

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .doc(props.postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            text: doc.data().text,
            username: doc.data().username,
            timestamp: doc.data().timestamp,
          }))
        );
      });

    return () => {
      unSub();
    };
  }, [props.postId]);
  return (
    <div className={styles.post}>
      <div className={styles.post_items}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} src={props.avatar}></Avatar>
            }
            action={
              <>
                {user.uid === props.uid && (
                  <IconButton onClick={handleClick} aria-haspopup="true">
                    <MoreVertIcon />
                  </IconButton>
                )}
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      width: "100px",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      deletePost();
                      handleClose();
                    }}
                  >
                    削除する
                  </MenuItem>
                </Menu>
              </>
            }
            title={props.username}
            subheader={new Date(props.timestamp?.toDate()).toLocaleString()}
          />
          <Typography className={classes.title} variant="h5" component="h3">
            {props.title}
          </Typography>
          <div className={styles.post_line}>
            <p>{props.content}</p>
          </div>
          <CardActions disableSpacing className={styles.post_category}>
            <Typography
              className={classes.CardContent}
              variant="body2"
              color="textSecondary"
              component="p"
            >
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
            <CardContent className={styles.post_card}>
              {comments.map((com) => (
                <div key={com.id} className={styles.post_comment}>
                  <Avatar src={com.avatar} className={classes.small} />

                  <span className={styles.post_commentUser}>
                    @{com.username}
                  </span>
                  <span className={styles.post_commentText}>{com.text} </span>
                  <span className={styles.post_headerTime}>
                    {new Date(com.timestamp?.toDate()).toLocaleString()}
                  </span>
                </div>
              ))}
              <form onSubmit={newComment}>
                <div className={styles.post_send}>
                  <input
                    className={styles.post_input}
                    type="text"
                    placeholder="Type new comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    disabled={!comment}
                    className={
                      comment ? styles.post_button : styles.post_buttonDisable
                    }
                    type="submit"
                  >
                    <SendIcon className={styles.post_sendIcon} />
                  </button>
                </div>
              </form>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
};
export default Post;
