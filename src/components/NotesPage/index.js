import React, { useRef, useState } from "react";
import Masonry from "react-masonry-component";
import getVisibleNotes from "../../selectors/notes";
import { useDispatch, useSelector } from "react-redux";
import classes from "./NotesPage.module.css";
import {
  deleteNote,
  editNote,
  editAndArchive,
  editAndUnarchive,
} from "../../redux/actions/notesAction";
import CreateArea from "../CreateArea";
import EditArea from "../EditArea";
import Header from "../Header";
import SideBar from "../Sidebar";
import Backdrop from "../Backdrop";
import Note from "../Note";

const NotesPage = (props) => {
  const [editedId, setEditedId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(null);
  const editArea = useRef(null);
  const notes = useSelector((state) => state.notes.notes);
  const labels = useSelector((state) => state.notes.labels);
  const archive = useSelector((state) => state.notes.archive);
  const text = useSelector((state) => state.filters.filterText);
  const color = useSelector((state) => state.filters.filterColor);
  const dispatch = useDispatch();

  const editHandler = (id) => {
    setEditedId(id);
    setEditing(true);
    let editedIndex = notes.findIndex((note) => {
      return note.id === id;
    });
    if (editedIndex > -1) {
      setEditedNote(notes[editedIndex]);
    } else {
      editedIndex = archive.findIndex((note) => {
        return note.id === id;
      });
      setEditedNote(archive[editedIndex]);
    }
  };
  const closeEditHandler = () => {
    setEditing(false);
    setEditedId(null);
    setEditedNote(null);
  };
  const path = props.match.path;
  const filterLabel = path === "/" ? "" : path.slice(7, path.length);
  const filterText = props.text;
  const filterColor = props.color;
  const displayedNotes = getVisibleNotes(
    notes,
    filterLabel,
    filterText,
    filterColor
  );
  const pinnedNotes = displayedNotes.filter((note) => {
    return note.pinned;
  });
  const unpinnedNotes = displayedNotes.filter((note) => {
    return !note.pinned;
  });
  let archivedNotes = [];
  if (filterLabel !== "") {
    archivedNotes = getVisibleNotes(
      props.archive,
      filterLabel,
      filterText,
      filterColor
    );
  }
  const noNotes =
    path === "/notes" ? (
      <div className={classes.Empty}>
        <span className={"material-icons-outlined " + classes.Icon}>note</span>
        <p className={classes.Note}>Notes you add appear here</p>
      </div>
    ) : (
      <div className={classes.Empty}>
        <span className={"material-icons " + classes.Icon}>label_outline</span>
        <p className={classes.Note}>No notes with this label yet</p>
      </div>
    );
  const backdropClickHandler = () => {
    editArea.current();
    closeEditHandler();
  };
  const editNotes = (id, notes) => {
    dispatch(editNote(id, notes));
  };
  const editAndArch = (oldNote, newNote) => {
    dispatch(editAndArchive(oldNote, newNote));
  };
  const editAndUnarch = (oldNote, newNote) => {
    dispatch(editAndUnarchive(oldNote, newNote));
  };

  return (
    <div>
      <div className={classes.NotesPage}>
        <Header />
        <SideBar openEditLabels={props.openEditLabels} />
        <CreateArea filterLabel={filterLabel} />

        {editing ? (
          <EditArea
            editAndUnarchive={editAndUnarch}
            editAndArchive={editAndArch}
            archive={archive}
            ref={editArea}
            note={editedNote}
            editNote={editNotes}
            // editedId={editedId}
            closeEdit={closeEditHandler}
          ></EditArea>
        ) : null}
        <Backdrop
          show={editing}
          onClick={backdropClickHandler}
          transparent={false}
        />
        {displayedNotes.length === 0 &&
        archivedNotes.length === 0 &&
        text === "" &&
        color === ""
          ? noNotes
          : null}

        {pinnedNotes.length > 0 ? (
          <div className={classes.Notes}>
            {text === "" && color === "" ? null : (
              <h3 className={classes.SearchResult}>Search Results:</h3>
            )}
            <h5>PINNED</h5>
            <Masonry>
              {pinnedNotes.map((note) => {
                return (
                  <Note
                    archived={false}
                    editable={true}
                    type={note.type}
                    editedId={editedId}
                    editing={editing}
                    key={note.id}
                    note={note}
                    // index={index}
                    deleteNote={dispatch(deleteNote(note.id))}
                    deleteTooltip="Delete Note"
                    showEditButton={true}
                    onClick={editHandler}
                  />
                );
              })}
            </Masonry>
          </div>
        ) : null}

        <div
          className={
            classes.Notes +
            (pinnedNotes.length > 0 ? " " + classes.NotesWhenPinned : "")
          }
        >
          {(text !== "" || color !== "") && pinnedNotes.length === 0 ? (
            <h3 className={classes.SearchResult}>Search Results:</h3>
          ) : null}
          {pinnedNotes.length > 0 && unpinnedNotes.length > 0 ? (
            <h5>OTHERS</h5>
          ) : null}
          <Masonry>
            {unpinnedNotes.map((note) => {
              return (
                <Note
                  archived={false}
                  editable={true}
                  type={note.type}
                  editedId={editedId}
                  editing={editing}
                  key={note.id}
                  note={note}
                  // index={index}
                  deleteNote={dispatch(deleteNote(note.id))}
                  deleteTooltip="Delete Note"
                  showEditButton={true}
                  onClick={editHandler}
                />
              );
            })}
          </Masonry>
        </div>

        <div
          className={
            classes.Notes +
            (archivedNotes.length > 0 ? " " + classes.NotesWhenPinned : "")
          }
        >
          {archivedNotes.length > 0 ? <h5>ARCHIVE</h5> : null}
          <Masonry>
            {archivedNotes.map((note) => {
              return (
                <Note
                  archived={true}
                  editable={true}
                  type={note.type}
                  editedId={editedId}
                  editing={editing}
                  key={note.id}
                  note={note}
                  // index={index}
                  deleteNote={dispatch(deleteNote(note.id))}
                  deleteTooltip="Delete Note"
                  showEditButton={true}
                  onClick={editHandler}
                />
              );
            })}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
