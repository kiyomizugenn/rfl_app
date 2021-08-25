import React from "react";
import { useHistory } from "react-router-dom";

// material ui
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 270,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "12px",
    },
  })
);

export const Tags = () => {
  const classes = useStyles();
  const history = useHistory();

  const isSelected = (category) => {
    history.push(`/?category=${category}`);
  };

  return (
    <>
      <List className={classes.root} aria-label="contacts">
        <ListItem button onClick={() => isSelected("rock")}>
          <ListItemText primary="#ROCK/POPS" id="rock" />
        </ListItem>
        <ListItem button onClick={() => isSelected("r&b")}>
          <ListItemText primary="#R&B/SOUL" id="r&b" />
        </ListItem>
        <ListItem button onClick={() => isSelected("hardrock")}>
          <ListItemText primary="#HARD ROCK" id="hardrock" />
        </ListItem>
        <ListItem button onClick={() => isSelected("heabymetal")}>
          <ListItemText primary="#HEABY METAL" id="heabymetal" />
        </ListItem>
        <ListItem button onClick={() => isSelected("blues")}>
          <ListItemText primary="#BLUES" id="blues" />
        </ListItem>
        <ListItem button onClick={() => isSelected("jazz")}>
          <ListItemText primary="#JAZZ" id="jazz" />
        </ListItem>
        <ListItem button onClick={() => isSelected("fusion")}>
          <ListItemText primary="#FUSION" id="fusion" />
        </ListItem>
        <ListItem button onClick={() => isSelected("jpop")}>
          <ListItemText primary="#JPOP" id="jpop" />
        </ListItem>
      </List>
    </>
  );
};
export default Tags;
