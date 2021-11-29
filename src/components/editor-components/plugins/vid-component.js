/** *** VidComponent *** */
/*
 * A component for rendering videos from atomic blocks.
 */

/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

const VidComponent = React.forwardRef(
  (
    { blockProps }, ref,
  ) => (
    <div style={{ width: `${blockProps.width}%` }} className="min-width">
      <video ref={ref} style={{ height: '100%', width: '100%' }} controls>
        <source src={blockProps.src} type="video/mp4" />
      </video>
    </div>

  ),
);
VidComponent.displayName = 'VidComponent';

export default VidComponent;
