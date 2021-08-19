import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#bdbdbd",
    cursor: "pointer",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  postFormButton: {
    fontWeight: "bold",
    fontSize: "15px",
    color: "#ffffff",
    "&:focus": {
      outline: "none",
    },
  },
  postFormLink: {
    marginRight: "15px",
    letterSpacing: "0.6px",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      opacity: "0.5",
    },
  },
  bookMark: {
    marginRight: "15px",
    color: "#fff",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      opacity: "0.5",
    },
  },
}));
const HeaderRight = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      {user.uid ? (
        <div className={classes.headerRight}>
          <Link to="/Post" className={classes.postFormLink}>
            <Button className={classes.postFormButton}>POST</Button>
          </Link>
          <Link to="/Post">
            <IconButton className={classes.bookMark}>
              <LibraryBooksIcon />
            </IconButton>
          </Link>
          <Avatar
            className={classes.avatar}
            src={user.photoURL}
            onClick={async () => {
              try {
                await auth.signOut();
                history.push("login");
              } catch (err) {
                alert(err.message);
              }
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default HeaderRight;
