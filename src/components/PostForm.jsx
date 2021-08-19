import React from "react";
import styles from "./module.css/PostForm.module.css";
import {
  Avatar,
  Button,
  CssBaseline,
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
import AddPhotoIcon from "@material-ui/icons/Photo";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import firebase from "firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const PostForm = () => {
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
    <div style={{ marginTop: "80px" }}>
      <form onSubmit={sendPost}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="current-title"
          autoFocus
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="content"
          label="Content"
          type="content"
          id="content"
          autoComplete="current-content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <FormControl className={styles.postform_control}>
          <InputLabel id="category-select-label">カテゴリー</InputLabel>
          <Select
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
        <Button
          variant="contained"
          type="submit"
          color="primary"
          style={{ width: "100%", marginTop: "15px" }}
        >
          Post
        </Button>
        <div>
          <button
            onClick={async () => {
              history.push("/");
            }}
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};
export default PostForm;
