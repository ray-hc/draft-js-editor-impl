/** ** PDF ** */
/*
 * Functions for generating and rendering PDFs in Draft.js editor.
 */

import { EditorState, AtomicBlockUtils } from 'draft-js';
import PDFComponent from './pdf-component';

/** *** addPDF *** */
/*
 * Create a new "atomic block" of type PDF, which can be rendered by PDFComponent.
 */
export function addPDF(editorState, url, width) {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'PDF',
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

/** *** createPDFPlugin *** */
/*
 * Block Renderer function tells Draft.JS how to render PDF (using PDFComponent).
 * Returns object with ref to both block renderer function, addPDF.
 */
const createPDFPlugin = (config) => {
  const blockRendererFn = (block, { getEditorState }) => {
    if (block.getType() === 'atomic') {
      const contentState = getEditorState().getCurrentContent();
      const entity = block.getEntityAt(0);

      if (!entity) return null;
      const { type } = contentState.getEntity(entity);
      const { src, width } = contentState.getEntity(entity).getData();

      if (type === 'PDF') {
        return {
          component: PDFComponent,
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
    addPDF,
  };
};

export default createPDFPlugin;
