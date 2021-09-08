import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewLabel } from "../../redux/actions/notesAction";
import AddIcon from "@material-ui/icons/Add";
import Button from "../Button";
import classes from "./EditLabels.module.css";
import EditLabel from "../EditLabel";

const EditLabels = (props) => {
  const [newLabel, setNewLabel] = useState("");
  const inputRef = useRef(null);

  const labels = useSelector((state) => state.notes.labels);
  const dispatch = useDispatch();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const changeNewLabel = (event) => {
    setNewLabel(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      dispatch(addNewLabel(newLabel));
      setNewLabel("");
    }
  };

  const addHandler = () => {
    dispatch(addNewLabel(newLabel));
    setNewLabel("");
    inputRef.current.focus();
  };

  return (
    <div className={classes.Form}>
      <div className={classes.InputArea}>
        <p stye={{ marginLeft: "20px", padding: "10px" }}>Edit Labels</p>
      </div>
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
            <li key={label}>
              <div className={classes.InputArea}>
                <EditLabel label={label} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={classes.DoneButton}>
        <Button tooltipTitle="Close" onClick={props.closeEditLabels}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default EditLabels;
