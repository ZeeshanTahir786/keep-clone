import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import classes from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../redux/actions/ui";
import NavigationItem from "../NavigationItem";
import EditLabelsNavItem from "../EditLabelsNavItem";

const Sidebar = (props) => {
  const labels = useSelector((state) => state.notes.labels);
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpenMobile);
  const dispatch = useDispatch();
  const clickAwayHandler = () => {
    if (sidebarOpen) {
      dispatch(closeSidebar());
    }
  };

  return (
    <ClickAwayListener onClickAway={clickAwayHandler} touchEvent={false}>
      <div
        className={
          classes.SideBar + " " + (sidebarOpen ? classes.Open : classes.Close)
        }
      >
        <nav>
          <ul className={classes.NavigationItems}>
            <NavigationItem path="/notes" iconName="note" title="Notes" />

            {labels.map((label) => {
              return (
                <NavigationItem
                  key={label}
                  path={"/label/" + label}
                  iconName="label"
                  title={label}
                />
              );
            })}
            <EditLabelsNavItem openEditLabels={props.openEditLabels} />
            <NavigationItem
              path="/archive"
              iconName="archive"
              title="Archive"
            />
            <NavigationItem path="/trash" iconName="delete" title="Trash" />
          </ul>
        </nav>
      </div>
    </ClickAwayListener>
  );
};

export default Sidebar;
