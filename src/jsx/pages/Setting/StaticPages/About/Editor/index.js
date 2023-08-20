import { EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './style.scss'

export default function EditorField() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
  };

  return (
    <div className="editorField">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}
