import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

import { alignToCoeffNode } from '../lib'

const styles = {
  node: {
    padding: "3px 7px",
    position: "absolute",

    transition: "opacity .5s",
    WebkitTransition: "opacity .5s"
  },

  nodeIsHidden: { opacity: 0 }
}

class Node extends Component {
  static propTypes = {
    id: PropTypes.string,
    isShown: PropTypes.bool,
    onMount: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
  }  

  constructor() {
    super();
    this.el = React.createRef();
  }

  componentDidMount() {
    this.props.onMount(this.el.current);
  }

  render() {
    const { align, classes, isShown, x, y } = this.props,
          tH = alignToCoeffNode(align.h)*100,
          tV = alignToCoeffNode(align.v)*100;

    return <div className={classnames(classes.node, { [classes.nodeIsHidden]: !isShown })}
                ref={this.el}
                style={{ left: x, top: y, transform: "translate("+tH+"%, "+tV+"%)" }}>{this.props.children}</div>
  }
}

export default withStyles(styles)(Node)
