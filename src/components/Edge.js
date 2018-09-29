import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

import { alignToCoeffEdge, cutEdge, cartesianToPolar } from '../lib'

const styles = {
  edge: {
    backgroundColor: "#999",
    height: 1,
    position: "absolute",
    transformOrigin: "left top",

    transition: "width .5s",
    WebkitTransition: "width .5s"
  },

  edgeIsHidden: { width: "0 !important" }
}

class Edge extends Component {
  static propTypes = {
    x1: PropTypes.number, 
    y1: PropTypes.number,
    w1: PropTypes.number,
    h1: PropTypes.number,
    x2: PropTypes.number, 
    y2: PropTypes.number,
    w2: PropTypes.number,
    h2: PropTypes.number
  }

  render() {
    const { align, classes, isShown, x1, y1, w1, h1, x2, y2, w2, h2 } = this.props,
          cH = alignToCoeffEdge(align.h), cV = alignToCoeffEdge(align.v),
          ax1 = x1 + cH*w1, ay1 = y1 + cV*h1, // Aligned x1, y1
          ax2 = x2 + cH*w2, ay2 = y2 + cV*h2, // Aligned x2, y2
          { x: cax1, y: cay1 } = cutEdge({ x1: ax1, y1: ay1, w1, h1, x2: ax2, y2: ay2 }), // Cut & Aligned x1, y1
          { x: cax2, y: cay2 } = cutEdge({ x1: ax2, y1: ay2, w1: w2, h1: h2, x2: ax1, y2: ay1 }), // Cut & Aligned x2, y2
          { angle, radius } = cartesianToPolar(cax1 - cax2, cay1 - cay2);

    return <div className={classnames(classes.edge, { [classes.edgeIsHidden]: !isShown })} 
                style={{ left: cax1, top: cay1, transform: 'rotate(' + angle + 'rad)', width: radius }}></div>
  }
}

export default withStyles(styles)(Edge)
