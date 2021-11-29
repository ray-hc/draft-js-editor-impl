/** ** Media-Picker ** */
/*
 * A rich-text editor which uses Facebook's Draft.JS to allow for all sorts of fancy behavior.
 * Implements built-in styling methods, as well as custom methods provided by plugins.
 */

import React, { useState, useRef } from 'react';
import { RichUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import 'draft-js/dist/Draft.css';

import plugins from './plugins';
import MediaPicker from './media-picker';

const plug = plugins();

const Style = {
  BOLD: 'BOLD',
  ITALIC: 'ITALIC',
  UNDERLINE: 'UNDERLINE',
  HIGHLIGHT: 'HIGHLIGHT',
};

const Type = {
  H2: 'header-two',
  H3: 'header-three',
  H4: 'header-four',
  UL: 'unordered-list-item',
  OL: 'ordered-list-item',
  QUOTE: 'blockquote',
};

function NewPage(props) {
  const [pickingImg, setPickingImg] = useState(false);
  const [pickingVid, setPickingVid] = useState(false);
  const [pickingEmbed, setPickingEmbed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [editorState, setEditorState] = useState(props.editorState);
  const editor = useRef(null);

  /** **** savePage ******** */
  /* Call parent's save function if not blank page */
  const savePage = () => {
    const plainTxt = editorState.getCurrentContent().getPlainText();
    if (!plainTxt) {
      setErrorMsg('Cannot save blank page!');
    } else {
      props.saveEditorState(editorState.getCurrentContent());
    }
  };

  /** **** BlockEditor Set State Functions ******** */
  /* For updating the block editor state when user clicks around */
  const onStyleClick = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const onTypeClick = (type) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  /** **** Add Media Functions ******** */
  /* Call plugin add functions on add. */
  const addImage = (url, width) => {
    setEditorState(plug.imagePlugin.addImage(editorState, url, width));
  };

  const addVid = (url, width) => {
    setEditorState(plug.vidPlugin.addVideo(editorState, url, width));
  };

  const addPDF = (url, width) => {
    setEditorState(plug.pdfPlugin.addPDF(editorState, url, width));
  };

  /** **** Modal View Toggle ******** */
  /* Pass appropriate add funcntion to modal, close modal when uploaded */
  const closeModal = () => {
    setPickingVid(false);
    setPickingImg(false);
    setPickingEmbed(false);
  };

  const modalPicker = () => {
    if (pickingImg) return <MediaPicker addMedia={addImage} closeModal={closeModal} />;
    if (pickingVid) return <MediaPicker addMedia={addVid} closeModal={closeModal} />;
    if (pickingEmbed) return <MediaPicker addMedia={addPDF} closeModal={closeModal} />;
    else return <></>;
  };

  /** **** Toolbar View Toggle ******** */
  /* Only show 1 toolbar @ time on mobile. */
  const [showStyleTool, setShowStyleTool] = useState(false);
  const [showTypeTool, setShowTypeTool] = useState(false);
  const [showMediaTool, setShowMediaTool] = useState(false);

  const setTool = (tool) => {
    switch (tool) {
      case 'STYLE':
        setShowStyleTool(!showStyleTool);
        setShowTypeTool(false);
        setShowMediaTool(false);
        break;
      case 'TYPE':
        setShowStyleTool(false);
        setShowTypeTool(!showTypeTool);
        setShowMediaTool(false);
        break;
      case 'MEDIA':
        setShowStyleTool(false);
        setShowTypeTool(false);
        setShowMediaTool(!showMediaTool);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="editor">
          <div className="toolbars">
            <div className="buttons">
              <button onClick={() => setTool('STYLE')} type="button" className={showStyleTool ? 'style-active' : ''}>Style</button>
              <button onClick={() => setTool('TYPE')} type="button" className={showTypeTool ? 'type-active' : ''}>H2+</button>
              <button onClick={() => setTool('MEDIA')} type="button" className={showMediaTool ? 'media-active' : ''}>Media</button>
            </div>
            <div className={showStyleTool ? 'show style-toolbar' : 'style-toolbar'}>
              <button onClick={() => { onStyleClick(Style.ITALIC); }} type="button" aria-label="italicize"><i className="fas fa-italic" /></button>
              <button onClick={() => { onStyleClick(Style.BOLD); }} type="button" aria-label="embolden"><i className="fas fa-bold" /></button>
              <button onClick={() => { onStyleClick(Style.UNDERLINE); }} type="button" aria-label="underline"><i className="fas fa-underline" /></button>
              <button onClick={() => { onStyleClick(Style.HIGHLIGHT); }} type="button" aria-label="highlight"><i className="fas fa-highlighter" /></button>
            </div>
            <div className={showTypeTool ? 'show block-type-toolbar' : 'block-type-toolbar'}>
              <button onClick={() => { onTypeClick(Type.P); }} type="button" aria-label="make paragraph"><i className="fas fa-paragraph" /></button>
              <button onClick={() => { onTypeClick(Type.H2); }} type="button" aria-label="make H2">H2</button>
              <button onClick={() => { onTypeClick(Type.H3); }} type="button" aria-label="make H3">H3</button>
              <button onClick={() => { onTypeClick(Type.H4); }} type="button" aria-label="make H4">H4</button>
              <button onClick={() => { onTypeClick(Type.UL); }} type="button" aria-label="make unordered list"><i className="fas fa-list-ul" /></button>
              <button onClick={() => { onTypeClick(Type.OL); }} type="button" aria-label="make ordered list"><i className="fas fa-list-ol" /></button>
              <button onClick={() => { onTypeClick(Type.QUOTE); }} type="button" aria-label="make quote"><i className="fas fa-quote-right" /></button>
            </div>
            <div className={showMediaTool ? 'show media-toolbar' : 'media-toolbar'}>
              <button onClick={() => { setPickingImg(true); }} type="button" aria-label="add image"><i className="fas fa-image" /></button>
              <button onClick={() => { setPickingVid(true); }} type="button" aria-label="add video"><i className="far fa-file-video" /></button>
              <button onClick={() => { setPickingEmbed(true); }} type="button" aria-label="add pdf"><i className="fas fa-file-alt" /></button>
            </div>
          </div>
          <Editor editorState={editorState}
            onChange={setEditorState}
            plugins={plug.plugins}
            ref={editor}
            placeholder="Page content here..."
          />
          <button onClick={() => savePage()} type="button" aria-label="Save Page"><i className="fas fa-save" /></button>
          <p>{errorMsg}</p>
        </div>
        {modalPicker()}
      </div>
    </>
  );
}

export default NewPage;
