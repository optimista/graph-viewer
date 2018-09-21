import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { alignToGraphCoeff } from './lib'
import Edge from './Edge'
import Node from './Node'
import styles from './styles.css'

export default class GraphViewer extends Component {
  static propTypes = {
    align: PropTypes.shape({
      h: PropTypes.oneOf(["left", "center", "right"]),
      v: PropTypes.oneOf(["top", "center", "bottom"])
    }),
    edges: PropTypes.shape({  
      head_id: PropTypes.number,
      tail_id: PropTypes.number
    }),
    nodes: PropTypes.shape({
      content: PropTypes.string,
      order: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number
    })
  }

  constructor(props) {
    super(props);

    this.state = { frame: 0, nodes: {} }    
    this.rNodes = {} // Stack for rendered nodes (height, width)
  
    // Handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleNodeMount = this.handleNodeMount.bind(this);
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
    const frame = this.state.frame, l = Object.keys(this.props.nodes).length;
    if (frame < l - 1) this.setState({ frame: frame + 1 });
  }

  handleClick(e) {
    this.next();
  }

  handleNodeMount(id, el) {
    this.rNodes[id] = { width: el.offsetWidth, height: el.offsetHeight };
    
    const lrn = Object.keys(this.rNodes).length, lpn = Object.keys(this.props.nodes).length;
    if (lrn === lpn) this.setState({ nodes: this.rNodes });
  }

  handleWheel(e) {
    e.preventDefault();
    e.deltaY > 0 ? this.next() : this.prev();
  }

  render() {
    const { align, edges, nodes } = this.props,
          { frame, nodes: sNodes } = this.state,
          edgeIds = Object.keys(edges),
          nodeIds = Object.entries(nodes).map(([key, value]) => ({ ...value, id: key })).sort((a, b) => a.order - b.order).map(n => n.id),
          nodesRendered = nodeIds.length === Object.keys(sNodes).length,
          isNodeShown = (id) => nodeIds.indexOf(id.toString()) <= frame,
          gX = alignToGraphCoeff(align.h) * 100 + "%", gY = alignToGraphCoeff(align.v) * 100 + "%";

    return (
      <div className={styles.graph} onClick={this.handleClick} onWheel={this.handleWheel}>
        <div className={styles.graphInner} style={{ left: gX, top: gY }}>
          {
            nodeIds.map(k => {
              const node = nodes[k];
              return <Node key={k} align={align}
                           id={k} isShown={isNodeShown(k)}
                           onMount={this.handleNodeMount}
                           x={node.x} y={node.y}>{node.content}</Node>
            })
          }
          {
            nodesRendered && edgeIds.map(k => {
              let { head_id, tail_id } = edges[k], x;

              // Switch head_id & tail_id for the purpose of transition
              const orderIsReversed = nodes[head_id].order > nodes[tail_id].order;
              if (orderIsReversed) { x = head_id; head_id = tail_id; tail_id = x; }
  
              const head = nodes[head_id], tail = nodes[tail_id],
                    sHead = sNodes[head_id], sTail = sNodes[tail_id],
                    isEdgeShown = isNodeShown(head_id) && isNodeShown(tail_id);

              return <Edge key={k} align={align} isShown={isEdgeShown}
                         x1={head.x} y1={head.y} w1={sHead.width} h1={sHead.height}
                         x2={tail.x} y2={tail.y} w2={sTail.width} h2={sTail.height} /> 
            })
          }
        </div>
      </div>
    )
  }
}
