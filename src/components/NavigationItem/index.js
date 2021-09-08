import React from "react";
import { useDispatch } from "react-redux";
import classes from "./NavigationItem.module.css";
import { setFilterText, setFilterColor } from "../../redux/actions/filters";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setFilterText(""));
    dispatch(setFilterColor(""));
  };
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        activeClassName={classes.active}
        to={props.path}
        exact
        onClick={onClickHandler}
      >
        <span
          className="material-icons-outlined"
          style={{
            verticalAlign: "middle",
            display: "inline-block",
            width: "30px",
          }}
        >
          {props.iconName}
        </span>{" "}
        <span
          style={{
            verticalAlign: "middle",
            display: "inline-block",
            paddingBottom: "3px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "80%",
          }}
        >
          {props.title}
        </span>
      </NavLink>
    </li>
  );
};

export default NavigationItem;
