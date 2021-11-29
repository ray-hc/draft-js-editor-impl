import React, { useEffect, useState } from 'react';

const EmbedPicker = (props) => {
  const [extURL, setExtURL] = useState('');
  const [embedTitle, setEmbedTitle] = useState('');
  const [width, setWidth] = useState(50);

  const submit = () => {
    props.addEmbed(extURL, width, embedTitle);
    props.closeModal();
  };

  useEffect(() => {
    console.log('mounted embed');
    console.log('extURL', extURL);
  });

  return (

    <div className="modal-wrapper">
      <div className="media-picker">
        <input onChange={(e) => setExtURL(e.target.value)} value={extURL} placeholder="Add url..." />
        <input onChange={(e) => setEmbedTitle(e.target.value)} value={embedTitle} placeholder="Name this element..." />
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

export default EmbedPicker;
