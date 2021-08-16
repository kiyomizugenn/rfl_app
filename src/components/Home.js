import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/index";
import { useHistory } from "react-router";
import Post from "./Post";
import styles from "./module.css/Home.module.css";

export const Home = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      title: "",
      content: "",
      category: "",
      timestamp: null,
      username: "",
    },
  ]);
  useEffect(() => {
    const unSub = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            title: doc.data().title,
            content: doc.data().content,
            category: doc.data().category,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  return (
    <div className={styles.home_wrapper}>
      {posts[0]?.id && (
        <>
          {posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              avatar={post.avatar}
              title={post.title}
              content={post.content}
              category={post.category}
              timestamp={post.timestamp}
              username={post.username}
            />
          ))}
        </>
      )}
    </div>
  );
};
