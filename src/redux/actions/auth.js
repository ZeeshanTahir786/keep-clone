import { firebase, googleAuthProvider } from "../../firebase";

export const login = (uid) => {
  return {
    type: "LOGIN",
    uid,
  };
};

export const startLogin = () => {
  return (dispatch) => {
    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setLoggingIn = (truth) => {
  return {
    type: "SET_LOGGING_IN",
    truth: truth,
  };
};
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const startLogout = () => {
  return (dispatch) => {
    return firebase.auth().signOut();
  };
};
