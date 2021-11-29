/** ** App ** */
/*
 * The container component.
 * Loads any editor state saved to local storage,
 * toggles edit mode based on user input.
 */

import '../style.scss';

import React, { useState } from 'react';
import { convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';

import NewPage from './editor-components/new-page';
import plugins from './editor-components/plugins';
import loadPage from './editor-components/load-page';

const App = () => {
  const plug = plugins();
  const [editing, setEditing] = useState(false);
  const [editorState, setEditorState] = useState(
    loadPage(localStorage.getItem('editor')),
  );

  const saveEditorState = (editorStateContent) => {
    const raw = convertToRaw(editorStateContent);
    localStorage.setItem('editor', JSON.stringify(raw));
    setEditorState(loadPage(localStorage.getItem('editor')));
    setEditing(false);
  };

  const ReadOnlyEditor = () => (
    <div className="no-border page-container">
      <Editor editorState={editorState} plugins={plug.plugins} onChange={() => (null)} readOnly />
      <button onClick={() => (setEditing(true))} type="button">Edit</button>
    </div>
  );

  return (
    <div>
      <h1>Rich Text Notes App</h1>
      {editing
        ? <NewPage editorState={editorState} saveEditorState={saveEditorState} />
        : <ReadOnlyEditor />}
    </div>
  );
};

export default App;
