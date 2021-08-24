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
import { db } from "../firebase";
import firebase from "firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

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
  const [error, setError] = useState("");

  const sendPost = async (e) => {
    e.preventDefault();
    if (title.length > 42) {
      return setError("タイトルは42文字以内で入力してください");
    }
    if (title === "") {
      return setError("タイトルは入力必須項目です");
    }
    if (content.length > 100) {
      return setError("内容は100文字以内で入力してください");
    }
    if (content === "") {
      return setError("内容入力は必須項目です");
    }
    setError("");
    try {
      db.collection("posts").add({
        avatar: user.photoURL,
        title: title,
        content: content,
        category: category,
        timestamp: firebase.firestore.Timestamp.now(),
        username: user.displayName,
        uid: user.uid,
      });
      setTitle("");
      setContent("");
      setCategory("");
      history.push("/");
    } catch {
      setError("投稿に失敗しました");
    }
  };

  return (
    <div className={styles.post_form}>
      <Card className={styles.post_form_card}>
        {error && <Alert severity="error">{error}</Alert>}
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
                  required
                  labelId="category-select-label"
                  id="category-select"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
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
