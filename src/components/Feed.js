import React from "react";
import { auth } from "../firebase/index";
export const Feed = () => {
  return (
    <div>
      <button onClick={() => auth.signOut()}>LOGOUT</button>
    </div>
  );
};
