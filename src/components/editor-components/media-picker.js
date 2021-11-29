/** ** Media-Picker ** */
/*
 * Component for user to pick PDF/Image/Video which calls appropriate
 * add function based on media type.
 */

import React, { useState } from 'react';
import uploadFile from '../../services/s3';

const MediaPicker = (props) => {
  const [file, setFile] = useState(null);
  const [extURL, setExtURL] = useState('');
  const [width, setWidth] = useState(50);

  const submit = (e) => {
    if (file) {
      uploadFile(file).then((url) => {
        props.addMedia(url, width);
        props.closeModal();
      });
    } else if (extURL) {
      props.addMedia(extURL, width);
      props.closeModal();
    }
  };

  const onFileUpload = (e) => {
    const thisFile = e.target.files[0];
    // Handle null file
    if (thisFile) {
      setFile(thisFile);
    }
  };

  return (
    <div className="modal-wrapper">
      <div className="media-picker">
        <input onChange={(e) => setExtURL(e.target.value)} value={extURL} placeholder="Add url..." />
        <p>OR UPLOAD:</p>
        <input type="file" onChange={onFileUpload} />
        <p>WIDTH:</p>
        <input type="range" id="points" name="points" min="0" max="100" value={width} onChange={(e) => (setWidth(e.target.value))} />
        <p>{width}%</p>
        <div>
          <button onClick={submit} type="button">Send</button>
          <button onClick={() => { props.closeModal(); }} type="button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default MediaPicker;
