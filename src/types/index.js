import PropTypes from 'prop-types'

const align = PropTypes.shape({
  h: PropTypes.oneOf(["left", "center", "right"]),
  v: PropTypes.oneOf(["top", "center", "bottom"])
});

const edges = PropTypes.arrayOf((props, propName, componentName) => {
  const isArray = Array.isArray(props[propName]),
        isOfLengthTwo = props[propName].length === 2,
        isOfIntegers = props[propName].every(Number.isInteger);

  return isArray && isOfLengthTwo && isOfIntegers ? null : new Error(`${propName} needs to be an array of two numbers`);
});

const nodes = PropTypes.arrayOf(PropTypes.shape({
  content: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number
}));

export const graph = PropTypes.shape({
  align: align, 
  edges: edges,
  nodes: nodes
});

export const start = (props, propName, componentName) => {
  const start = parseInt(props[propName]);
  if (start < 0 || props["graph"].nodes.length < start) return new Error(propName + ' is out of range');  
};
