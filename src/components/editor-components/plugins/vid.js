/** ** Vid ** */
/*
 * Functions for generating and rendering videoss in Draft.js editor.
 */

import { EditorState, AtomicBlockUtils } from 'draft-js';
import VidComponent from './vid-component';

/** *** addVideo *** */
/*
 * Create a new "atomic block" of type VID, which can be rendered by VidComponent.
 */
export function addVideo(editorState, url, width) {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'VID',
    'IMMUTABLE',
    { src: url, width },
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' ',
  );
  return EditorState.forceSelection(
    newEditorState,
    newEditorState.getCurrentContent().getSelectionAfter(),
  );
}

/** *** createVidPlugin *** */
/*
 * Block Renderer function tells Draft.JS how to render VID (using VidComponent).
 * Returns object with ref to both block renderer function, addVideo.
 */
const createVidPlugin = () => {
  const blockRendererFn = (block, { getEditorState }) => {
    if (block.getType() === 'atomic') {
      const contentState = getEditorState().getCurrentContent();
      const entity = block.getEntityAt(0);

      if (!entity) return null;
      const { type } = contentState.getEntity(entity);
      const { src, width } = contentState.getEntity(entity).getData();

      if (type === 'VID') {
        return {
          component: VidComponent,
          editable: false,
          props: {
            src,
            width,
          },
        };
      }
    }
    return null;
  };

  return {
    blockRendererFn,
    addVideo,
  };
};

export default createVidPlugin;
