import React from "react";
import styles from "./module.css/PostForm.module.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  Card,
  CardContent,
  TextField,
  Paper,
  Grid,
  Typography,
  Modal,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import firebase from "firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TitleIcon from "@material-ui/icons/Title";
import CategoryIcon from "@material-ui/icons/Category";
import DetailsIcon from "@material-ui/icons/Details";

const useStyles = makeStyles((theme) => ({
  postFormBox: {
    width: "95%",
  },
  postFormTextField: {
    width: "100%",
    marginBottom: "50px",
    borderBottom: "2px solid #3333ff",
  },
}));
const PostForm = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const sendPost = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      avatar: user.photoURL,
      title: title,
      content: content,
      category: category,
      timestamp: firebase.firestore.Timestamp.now(),
      username: user.displayName,
    });
    setTitle("");
    setContent("");
    setCategory("");
    history.push("/");
  };

  return (
    <div className={styles.post_form}>
      <Card className={styles.post_form_card}>
        <CardContent className={styles.post_form_container}>
          <div className={styles.post_form_head}>
            <h2>Post Form</h2>
          </div>
          <div className={classes.postFormBox}>
            <form onSubmit={sendPost}>
              <TextField
                className={classes.postFormTextField}
                required
                id="title"
                label="Title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <br />

              <FormControl className={styles.post_form_control}>
                <InputLabel id="category-select-label" required>
                  Category
                </InputLabel>
                <Select
                  className={styles.post_form_select}
                  labelId="category-select-label"
                  id="category-select"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="frontend">フロントエンドエンジニア</MenuItem>
                  <MenuItem value="backend">バックエンドエンジニア</MenuItem>
                  <MenuItem value="infra">インフラエンジニア</MenuItem>
                  <MenuItem value="designer">デザイナー</MenuItem>
                </Select>
              </FormControl>
              <br />

              <TextField
                className={classes.postFormTextField}
                required
                name="content"
                label="Content"
                type="text"
                id="content"
                multiline={true}
                rows={4}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />

              <Button
                variant="contained"
                type="submit"
                color="primary"
                style={{ width: "100%", marginTop: "15px" }}
              >
                Post
              </Button>
            </form>
            <div>
              <button
                className={styles.post_form_btn}
                onClick={async () => {
                  history.push("/");
                }}
              >
                キャンセル
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default PostForm;
