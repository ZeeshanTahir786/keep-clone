import React from "react";
import { useDispatch } from "react-redux";
import { startLogin } from "../../redux/actions/auth";
import classes from "./Login.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  return (
    <div className={classes.Screen}>
      <div className={classes.Form}>
        <h1>
          <i className="far fa-lightbulb"></i> <span>Google Keep Clone</span>
        </h1>

        <div>
          <p>Keep your notes organized.</p>
        </div>
        <div className={classes.ButtonArea}>
          <button onClick={dispatch(startLogin())}>Login with Google</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
