import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ArchivePage from "./components/ArchivePage";
import LoginPage from "./components/Login";
import NotesPage from "./components/NotesPage";
import NotFoundPage from "./components/NotFoundPage";
import TrashPage from "./components/TrashPage";
import Backdrop from "./components/Backdrop";
import Loading from "./components/loading";
import EditLabels from "./components/EdiLabels";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const App = (props) => {
  const [editingLabels, setEditingLabels] = useState(false);
  const labels = useSelector((state) => state.notes.labels);
  const LoggingIn = useSelector((state) => state.auth.loggingIn);
  const openEditLabels = () => {
    setEditingLabels(true);
  };
  console.log("jkdsevjflsjm", labels, LoggingIn);
  const closeEditLabels = () => {
    setEditingLabels(false);
  };
  const routes = (
    <Switch>
      <Route path="/" exact render={(props) => <LoginPage />} />
      <Route
        path="/notes"
        exact
        render={(props) => (
          <NotesPage {...props} openEditLabels={openEditLabels} />
        )}
      />
      <Route
        path="/archive"
        exact
        render={(props) => (
          <ArchivePage {...props} openEditLabels={openEditLabels} />
        )}
      />
      <Route
        path="/trash"
        exact
        render={(props) => (
          <TrashPage {...props} openEditLabels={openEditLabels} />
        )}
      />
      {labels.map((label) => {
        return (
          <Route
            key={label}
            path={"/label/" + label}
            exact
            render={(props) => (
              <NotesPage {...props} openEditLabels={openEditLabels} />
            )}
          />
        );
      })}
      <Route component={NotFoundPage} />
    </Switch>
  );

  return (
    <Router history={history}>
      {LoggingIn ? (
        <Loading />
      ) : (
        <React.Fragment>
          {editingLabels ? (
            <EditLabels closeEditLabels={closeEditLabels} />
          ) : null}
          <Backdrop
            show={editingLabels}
            onClick={closeEditLabels}
            transparent={false}
          />
          {routes}
        </React.Fragment>
      )}
    </Router>
  );
};

export default App;
