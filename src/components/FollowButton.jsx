import React, { useState, useEffect } from "react";
import { db } from "../firebase";
// material ui
import Button from "@material-ui/core/Button";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import firebase from "firebase";

export const FollowButton = (id, props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectUid, setSelectUid] = useState([]);
  const user = useSelector(selectUser);

  const follow = (following_uid, followed_uid) => {
    db.collection("follows")
      .add({
        following_uid: following_uid,
        followed_uid: followed_uid,
      })
      .then(async (result) => {
        const id = result.id;
        console.log(id);
        const followsRef = db.collection("follows").doc(id);
        await followsRef.set({ id: id }, { merge: true });
      });
  };

  const unFollow = (followsId) => {
    db.collection("follows").doc(followsId).delete();
  };
  const handleClick = (props) => {
    if (isFollowing === false) {
      return unFollow(props.id);
    } else {
      console.log(props.uid);
      return follow(user.uid, selectUid.value);
    }
  };

  useEffect(() => {
    if (id) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [isFollowing]);

  useEffect(() => {
    db.collection("posts")
      .doc(props.postId)
      .onSnapshot((snapshot) => {
        setSelectUid(
          snapshot.docs((doc) => ({
            uid: doc.data().uid,
          }))
        );
      });
  }, []);
  return (
    <div className="follow_btn-wrapper">
      <Button
        className={
          "follow_btn-same" +
          " " +
          (isFollowing ? "following_btn" : "follow_btn")
        }
        variant="outlined"
        size="small"
        onClick={handleClick}
      >
        {isFollowing ? "FOLLOWING" : "FOLLOW"}
      </Button>
    </div>
  );
};
export default FollowButton;
