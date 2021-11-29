/** ** Plugins ** */
/*
 * A single plugins object which allows us to consistenly
 * retrieve the same plugins across different
 * instances of Draft.js editor.
 */

import createVidPlugin from './vid';
import highlight from './highlight';
import createMyImgPlugin from './img';
import createPDFPlugin from './pdf';

function plugins() {
  const highlightPlugin = highlight();
  const imagePlugin = createMyImgPlugin();
  const vidPlugin = createVidPlugin();
  const pdfPlugin = createPDFPlugin();

  return ({
    imagePlugin,
    vidPlugin,
    pdfPlugin,
    plugins: [highlightPlugin, imagePlugin, vidPlugin, pdfPlugin],
  });
}

export default plugins;
