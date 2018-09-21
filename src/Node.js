import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { alignToNodeCoeff } from './lib'

import styles from './styles.css'

export default class Node extends Component {
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
    this.props.onMount(this.props.id, this.el.current);
  }

  render() {
    const { align, isShown, x, y } = this.props,
          tH = alignToNodeCoeff(align.h)*100,
          tV = alignToNodeCoeff(align.v)*100;

    return <div className={classnames(styles.node, { [styles.nodeIsHidden]: !isShown })}
                ref={this.el}
                style={{ left: x, top: y, transform: "translate("+tH+"%, "+tV+"%)" }}>{this.props.children}</div>
  }
}
