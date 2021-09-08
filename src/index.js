import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Loading from "./components/loading";
import { store } from "./app/store";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { firebase } from "./firebase";
import { login, logout, setLoggingIn } from "./redux/actions/auth";
import { setMainState } from "./redux/actions/notesAction";
import { createState } from "./utils/firebaseToState";

export const history = createBrowserHistory();

// let hasRendered = false;
// const renderApp = () => {
//   if (!hasRendered) {
//     ReactDOM.render(
// <Provider store={store}>
//   <App />
// </Provider>,
//       document.getElementById("root")
//     );
//     hasRendered = true;
//   }
// };

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     store.dispatch(login(user.uid));
//     const route = "/users/" + user.uid;
//     // console.log(route);
//     firebase
//       .database()
//       .ref(route)
//       .once("value")
//       .then((response) => {
//         const state = createState(response.val());
//         store.dispatch(setMainState(state));
//         renderApp();
//         if (history.location.pathname === "/") {
//           history.push("/notes");
//         }
//         store.dispatch(setLoggingIn(false));
//       });
//   } else {
//     // console.log("log out");
//     store.dispatch(logout());
//     renderApp();
//     history.push("/");
//   }
// });
