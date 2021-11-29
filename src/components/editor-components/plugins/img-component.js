/** ** Image Component ** */
/*
 * A component for rendering images from atomic blocks.
 */

/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

const ImgComponent = React.forwardRef(
  (
    { blockProps }, ref,
  ) => (
    <div style={{ width: `${blockProps.width}%` }} className="min-width">
      <img ref={ref} src={blockProps.src} style={{ height: '100%', width: '100%' }} alt="" />
    </div>

  ),
);
ImgComponent.displayName = 'ImgComponent';

export default ImgComponent;
