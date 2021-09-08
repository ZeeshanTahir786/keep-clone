import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./AddLabels.module.css";
import Button from "../Button";
import AddIcon from "@material-ui/icons/Add";
import AddLabelItem from "../AddLabelItem";
import { useDispatch } from "react-redux";
import { addNewLabel } from "../../redux/actions/notesAction";

const AddLabels = (props) => {
  const [newLabel, setNewLabel] = useState("");
  const inputRef = useRef(null);
  const labels = useSelector((state) => state.main.labels);
  const dispatch = useDispatch();
  const changeNewLabel = (event) => {
    setNewLabel(event.target.value);
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      dispatch(addNewLabel(newLabel));
      props.addNewChosenLabelHandler(newLabel);
      setNewLabel("");
      inputRef.current.focus();
    }
  };

  const addHandler = () => {
    dispatch(addNewLabel(newLabel));
    props.addNewChosenLabelHandler(newLabel);
    setNewLabel("");
    inputRef.current.focus();
  };

  return (
    <div className={classes.List}>
      <div className={classes.InputArea}>
        <input
          ref={inputRef}
          onKeyPress={handleEnter}
          className={classes.Input}
          autoComplete="off"
          name="label"
          placeholder="Add label..."
          value={newLabel}
          onChange={changeNewLabel}
          maxLength="40"
        />{" "}
        <Button tooltipTitle="Create new label" onClick={addHandler}>
          <AddIcon />
        </Button>
      </div>
      <ul>
        {labels.map((label) => {
          return (
            <AddLabelItem
              key={label}
              label={label}
              clickHandler={props.clickHandler}
              filterLabel={props.filterLabel}
              chosenLabels={props.chosenLabels}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default AddLabels;
