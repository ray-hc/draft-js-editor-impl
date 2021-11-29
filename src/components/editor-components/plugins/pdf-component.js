/** ** Image Component ** */
/*
 * A component for rendering PDFs from atomic blocks.
 * Can be expanded to view in larger size.
 */

/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';

const PDFComponent = React.forwardRef(
  (
    { block, blockProps },
  ) => {
    const [isBig, setBig] = useState(false);
    return (
      <>
        <button onClick={() => setBig(!isBig)} aria-label="toggle size" type="button">
          <i className={`fas ${isBig ? 'fa-compress-arrows-alt' : 'fa-expand-arrows-alt'}`} />
        </button>
        <div style={{ width: `${blockProps.width}%` }} className={isBig ? 'min-width iframe-resizer' : 'min-width pdf'}>
          <iframe src={blockProps.src} type="application/pdf" width="100%" title={block.key}>
            <p><a href={blockProps.src}>Link to PDF</a></p>
          </iframe>
        </div>
      </>
    );
  },
);
PDFComponent.displayName = 'PDFComponent';

export default PDFComponent;
