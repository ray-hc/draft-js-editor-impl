/** *** Highlight *** */
/*
 * A simple plugin allowing for the highlighting of text in yellow.
 */

const highlight = () => {
  return {
    customStyleMap: {
      HIGHLIGHT: {
        background: '#fffe0d',
      },
    },
  };
};

export default highlight;
