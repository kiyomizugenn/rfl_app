import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase/index";
import { useHistory } from "react-router";
import Post from "./Post";
import styles from "./module.css/Home.module.css";
import Tags from "./Tags";
import { red } from "@material-ui/core/colors";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FeedSelector from "./FeedSelector";
import TagTimeline from "./TagTimeline";

//データベースから受け取る
// デフォルトで描画
// クエリパラメーターが変化したとき、上記と同一のカテゴリーのみ　Post描画

export const Home = () => {
  const history = useHistory();
  const [currentPost, setCurrentPost] = useState([
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

  const query = window.location.search;
  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";

  useEffect(() => {
    const f = async () => {
      await getPosts(category);
    };
    f();
  }, [query]);

  const getPosts = async (category) => {
    let query = db.collection("posts").orderBy("timestamp", "desc");

    query = category !== "" ? query.where("category", "==", category) : query;

    let posts = [];

    await query.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          avatar: doc.data().avatar,
          title: doc.data().title,
          content: doc.data().content,
          category: doc.data().category,
          timestamp: doc.data().timestamp,
          username: doc.data().username,
        });
      });

      setCurrentPost(posts);
    });
  };

  return (
    <div className={styles.home_wrapper}>
      <div className={styles.home_aside}>
        <h5 style={{ marginTop: "15px" }}>
          <LocalOfferIcon style={{ color: red[500] }} />
          &nbsp; Tags
        </h5>
        <Tags />
        <TagTimeline />
      </div>
      <div className={styles.home_post}>
        <h3>Posts</h3>
        {currentPost[0]?.id && (
          <>
            {currentPost.map((post) => (
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
    </div>
  );
};
