import { convertFromRaw, EditorState } from 'draft-js';

const loadPage = (raw) => {
  if (raw == null) return (EditorState.createEmpty());
  const thawed = JSON.parse(raw);
  const cooked = convertFromRaw(thawed);
  const editor = EditorState.createWithContent(cooked);
  return (editor);
};

export default loadPage;
