import React, { useState, useEffect } from "react";

// material ui
import Button from "@material-ui/core/Button";

export const FollowButton = (id, uid) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleClick = () => {
    if (isFollowing === true) {
      return unFollow(id);
    } else {
      return follow(currentUser.uid, uid);
    }
  };

  useEffect(() => {
    if (id) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [isFollowing]);

  return (
    <div className="follow_btn-wrapper">
      {currentUser.uid !== uid && (
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
      )}
    </div>
  );
};
export default FollowButton;
