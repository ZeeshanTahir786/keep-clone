import React from "react";
import { useDispatch } from "react-redux";
import { editNote } from "../../redux/actions/notesAction";
import classes from "./ListItem.module.css";

const ListItem = (props) => {
  const dispatch = useDispatch();

  const toggleHandler = (event) => {
    event.stopPropagation();
    let checked = [...props.list.checked];
    let unchecked = [...props.list.unchecked];
    if (props.checked) {
      checked = checked.filter((item) => {
        return item.id !== props.item.id;
      });
      unchecked = [...unchecked, { ...props.item }];
    } else {
      unchecked = unchecked.filter((item) => {
        return item.id !== props.item.id;
      });
      checked = [{ ...props.item }, ...checked];
    }
    const newNote = {
      ...props.list,
      checked: checked,
      unchecked: unchecked,
    };
    dispatch(editNote(props.list.id, newNote));
  };
  return (
    <li>
      <div
        className={
          props.editable
            ? classes.Editable + " " + classes.Checkbox
            : classes.NotEditable + " " + classes.Checkbox
        }
        onClick={props.editable ? toggleHandler : null}
      >
        {props.checked ? (
          <i className="far fa-check-square"></i>
        ) : (
          <i className="far fa-square"></i>
        )}
      </div>
      <div
        style={{
          textDecoration: props.checked ? "line-through" : "default",
          display: "inline-block",
          marginLeft: "21px",
          width: "82%",
          marginBottom: "5px",
        }}
      >
        {props.item.item}
      </div>
    </li>
  );
};

export default ListItem;
