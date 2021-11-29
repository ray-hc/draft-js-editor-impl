/** ** Img ** */
/*
 * Functions for generating and rendering images in Draft.js editor.
 */

import { EditorState, AtomicBlockUtils } from 'draft-js';
import ImgComponent from './img-component';

/** *** addImage *** */
/*
 * Create a new "atomic block" of type IMG, which can be rendered by ImgComponent.
 */
export function addImage(editorState, url, width) {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'IMG',
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

/** *** createMyImgPlugin *** */
/*
 * Block Renderer function tells Draft.JS how to render IMG (using IMGComponent).
 * Returns object with ref to both block renderer function, addImage.
 */
const createMyImgPlugin = () => {
  const blockRendererFn = (block, { getEditorState }) => {
    if (block.getType() === 'atomic') {
      const contentState = getEditorState().getCurrentContent();
      const entity = block.getEntityAt(0);

      if (!entity) return null;
      const { type } = contentState.getEntity(entity);
      const { src, width } = contentState.getEntity(entity).getData();

      if (type === 'IMG') {
        return {
          component: ImgComponent,
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
    addImage,
  };
};

export default createMyImgPlugin;
