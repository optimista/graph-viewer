import PropTypes from 'prop-types'

export const align = PropTypes.shape({
  h: PropTypes.oneOf(["left", "center", "right"]),
  v: PropTypes.oneOf(["top", "center", "bottom"])
});

export const edges = PropTypes.arrayOf((props, propName, componentName) => {
  const isArray = Array.isArray(props[propName]),
        isOfLengthTwo = props[propName].length === 2,
        isOfIntegers = props[propName].every(Number.isInteger);

  return isArray && isOfLengthTwo && isOfIntegers ? null : new Error(`${propName} needs to be an array of two numbers`);
});

export const nodes = PropTypes.arrayOf(PropTypes.shape({
  content: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number
}))
