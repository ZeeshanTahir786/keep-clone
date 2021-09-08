import React, { useRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import classes from "./EditLabel.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLabelCompletely,
  editLabel,
} from "../../redux/actions/notesAction";
import Button from "../Button";

const EditLabel = (props) => {
  const [labelName, setLabelName] = useState(props.label);
  const [dialogOpen, setDialogOpen] = useState(false);
  const labels = useSelector((state) => state.notes.labels);
  const filterLabel = useSelector((state) => state.filters.filterText);
  const inputRef = useRef(null);

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const changeLabelName = (event) => {
    setLabelName(event.target.value);
  };
  const handleDialogkOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const editHandler = () => {
    if (!labels.includes(labelName)) {
      dispatch(editLabel(props.label, labelName));
      if ("/label/" + props.label === location.pathname) {
        history.push("/label/" + labelName);
      }
    } else {
      setLabelName(props.label);
      inputRef.current.focus();
    }
  };
  const deleteHandler = () => {
    if ("/label/" + props.label === location.pathname) {
      history.push("/notes");
    }
    dispatch(deleteLabelCompletely(props.label));
  };
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      if (!labels.includes(labelName)) {
        dispatch(editLabel(props.label, labelName));
        if ("/label/" + props.label === location.pathname) {
          history.push("/label/" + labelName);
        }
        inputRef.current.blur();
      } else {
        setLabelName(props.label);
      }
    }
  };

  return (
    <div className={classes.InputArea}>
      <Button tooltipTitle="Delete this label" onClick={handleDialogkOpen}>
        <DeleteForeverIcon />
      </Button>
      <input
        ref={inputRef}
        type="text"
        className={classes.Input}
        onKeyPress={handleEnter}
        style={{ display: "inline-block", paddingLeft: "0" }}
        value={labelName}
        onChange={changeLabelName}
        name="label name"
        placeholder="Edit label name..."
      />
      <Button tooltipTitle="Edit" onClick={editHandler}>
        <EditIcon />
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <DialogContent>
          <DialogContentText>
            We’ll delete this label and remove it from all of your notes. Your
            notes won’t be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className={classes.Button}>
            <Button onClick={handleDialogClose} tooltipTitle="Cancel">
              Cancel
            </Button>
          </div>
          <div className={classes.Button}>
            <Button onClick={deleteHandler} tooltipTitle="Delete">
              Delete
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditLabel;
