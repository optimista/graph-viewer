import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

export default class GraphViewer extends Component {
  static propTypes = {
    graph: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string
      }))
    })
  }

  constructor() {
    super();

    this.state = { frame: 0 }    
  
    // Handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleWheel = this.handleWheel.bind(this);

    // Rest
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  prev() {
    const frame = this.state.frame;
    if (frame > 0) this.setState({ frame: frame - 1 });
  }

  next() {
    const frame = this.state.frame, l = this.props.graph.nodes.length;
    if (frame < l - 1) this.setState({ frame: frame + 1 });
  }

  handleClick() {
    this.next();
  }

  handleWheel(e) {
    e.deltaY > 0 ? this.next() : this.prev();
  }

  render() {
    const { graph } = this.props,
          { frame } = this.state,
          className = { node: (i) => classnames(styles.node, { [styles.nodeIsHidden]: frame < i }) },
          handlers = { graph: { onClick: this.handleClick, onWheel: this.handleWheel } };

    return (
      <div className={styles.graph} {...handlers.graph}>
        { graph.nodes.map((n, i) => <div key={i} className={className.node(i)} style={{ left: n.x, top: n.y }}>{n.content}</div>) }
      </div>
    )
  }
}
