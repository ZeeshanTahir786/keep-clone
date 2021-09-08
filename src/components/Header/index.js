import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useState, useRef } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import CloudDoneOutlinedIcon from "@material-ui/icons/CloudDoneOutlined";
import Button from "../Button";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ColorPopper from "../ColorPopper";
import MenuIcon from "@material-ui/icons/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
import { firebase } from "../../firebase";
import {
  closeSidebar,
  openSidebar,
  syncSuccess,
  syncFail,
} from "../../redux/actions/ui";
import { setFilterColor, setFilterText } from "../../redux/actions/filters";
import { startLogout } from "../../redux/actions/auth";

const color = (color) => {
  switch (color) {
    case "white":
      return classes.white;

    case "orange":
      return classes.orange;

    case "yellow":
      return classes.yellow;

    case "green":
      return classes.green;

    case "turquoise":
      return classes.turquoise;

    case "blue":
      return classes.blue;

    case "darkblue":
      return classes.darkblue;

    case "purple":
      return classes.purple;

    case "pink":
      return classes.pink;

    default:
      return;
  }
};

const Header = (props) => {
  const [colorPopperLocation, setColorPopperLocation] = useState(null);
  const text = useSelector((state) => state.filters.filterText);
  const color = useSelector((state) => state.filters.filterColor);
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpenMobile);
  const syncStatus = useSelector((state) => state.ui.syncStatus);
  const main = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const open = Boolean(colorPopperLocation);
  const id = open ? "simple-popper" : undefined;
  const menu = useRef(null);
  const openColorEditHandler = (event) => {
    // event.stopPropagation();
    event.stopPropagation();
    setColorPopperLocation((oldColorPopperLocation) => {
      return oldColorPopperLocation ? null : event.currentTarget;
    });
  };
  const closeColorEditHandler = (event) => {
    if (open) {
      console.log(event);
      setColorPopperLocation(null);
    }
  };
  const setfilterText = (event) => {
    dispatch(setFilterText(event.target.value));
  };

  const setFilterCol = (color) => {
    dispatch(setFilterColor(color));
    closeColorEditHandler();
  };
  const clearSearch = () => {
    dispatch(setFilterText(""));
    dispatch(setFilterColor(""));
  };

  const toggleSidebar = (event) => {
    if (props.sidebarOpen) {
      dispatch(closeSidebar());
    } else {
      event.stopPropagation();
      dispatch(openSidebar());
    }
  };

  const refreshSyncHandler = () => {
    const route = "/users/" + props.uid;
    props.syncingStart();
    firebase
      .database()
      .ref(route)
      .set(props.main)
      .then(() => {
        console.log("success");
        dispatch(syncSuccess());
      })
      .catch(() => {
        dispatch(syncFail());
      });
  };

  let syncButton = (
    <Tooltip title="synced">
      <button className={classes.Cloud}>
        <CloudDoneOutlinedIcon />
      </button>
    </Tooltip>
  );

  if (syncStatus === "syncing") {
    syncButton = (
      <Tooltip title="synced">
        <button className={classes.Cloud}>
          <div class={classes.Loader}></div>
        </button>
      </Tooltip>
    );
  } else if (syncStatus === "failed") {
    syncButton = (
      <Tooltip title="Failed to sync. Click here to try again.">
        <button
          className={classes.Cloud + " " + classes.Red}
          onClick={refreshSyncHandler}
        >
          <RefreshIcon />
        </button>
      </Tooltip>
    );
  }

  return (
    <header className={classes.header}>
      <span
        className={classes.HamburgerMenu}
        onClick={toggleSidebar}
        ref={menu}
      >
        <MenuIcon fontSize="inherit" />
      </span>
      <span className={classes.Keeper}>
        <Link to="/notes" exact="true" onClick={clearSearch}>
          <h1>
            <i className="far fa-lightbulb"></i> <span>Google Keep</span>
          </h1>
        </Link>
      </span>
      <div className={classes.Search}>
        <div className={classes.SearchButton}>
          <Button tooltipTitle="Search">
            <SearchIcon />
          </Button>
        </div>
        <input
          type="text"
          placeholder={
            "Search" + (props.color === "" ? "" : " within " + props.color)
          }
          value={props.text}
          onChange={setfilterText}
        ></input>
        <div className={classes.RightButtons}>
          <div
            className={
              classes.PaletteButton + " " + (color === "" ? "" : color(color))
            }
          >
            <Button
              tooltipTitle="Filter by color"
              onClick={openColorEditHandler}
            >
              <PaletteOutlinedIcon />
            </Button>
          </div>
          <ClickAwayListener
            onClickAway={closeColorEditHandler}
            touchEvent={false}
          >
            <Popper
              id={id}
              open={open}
              anchorEl={colorPopperLocation}
              disablePortal
            >
              <ColorPopper changeColorHandler={setFilterCol} />
            </Popper>
          </ClickAwayListener>
          <div className={classes.ClearButton}>
            <Button
              tooltipTitle="Clear Search and Color Filter"
              onClick={clearSearch}
            >
              <ClearIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className={classes.LogoutButton}>
        {syncButton}
        <button onClick={dispatch(startLogout())} className={classes.Logout}>
          Logout
        </button>
      </div>
    </header>
  );
};
export default Header;
