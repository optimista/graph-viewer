import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

import Edge from './Edge'
import Node from './Node'
import { alignToCoeffGraph } from '../lib'

const styles = {
  graph: {
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    width: "100%",
  },

  graphInner: { position: "absolute", width: "99999px" }
}

class Graph extends Component {
  static propTypes = {
    align: PropTypes.shape({
      h: PropTypes.oneOf(["left", "center", "right"]),
      v: PropTypes.oneOf(["top", "center", "bottom"])
    }),
    frame: PropTypes.number,
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

    this.state = { frame: Object.keys(props.nodes).length, rNodes: {} }    
    this.rNodes = {} // Stack for rendered nodes (height, width) - goes to state after all nodes have their h, w
  
    // Handlers
    this.handleNodeMount = this.handleNodeMount.bind(this);
  }
  
  handleNodeMount(id, el) {
    this.rNodes[id] = { width: el.offsetWidth, height: el.offsetHeight };
    
    const lrn = Object.keys(this.rNodes).length, lpn = Object.keys(this.props.nodes).length;
    if (lrn === lpn) this.setState({ rNodes: this.rNodes });
  }
  
  render() {
    const { align, classes, edges, frame, nodes } = this.props,
          { rNodes, scrolled, replayed } = this.state,
          edgeIds = Object.keys(edges),
          nodeIds = Object.entries(nodes).map(([key, value]) => ({ ...value, id: key })).sort((a, b) => a.order - b.order).map(n => n.id),
          isNodesRendered = nodeIds.length === Object.keys(rNodes).length,
          isNodeShown = (id) => nodeIds.indexOf(id.toString()) < frame,
          gX = alignToCoeffGraph(align.h) * 100 + "%", gY = alignToCoeffGraph(align.v) * 100 + "%";

    return (
      <div className={classes.graph}>
        <div className={classes.graphInner} style={{ left: gX, top: gY }}>
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
            isNodesRendered && edgeIds.map(k => {
              let { head_id, tail_id } = edges[k], x;

              // Switch head_id & tail_id for the purpose of transition
              const orderIsReversed = nodes[head_id].order > nodes[tail_id].order;
              if (orderIsReversed) { x = head_id; head_id = tail_id; tail_id = x; }
  
              const head = nodes[head_id], tail = nodes[tail_id],
                    sHead = rNodes[head_id], sTail = rNodes[tail_id],
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

export default withStyles(styles)(Graph)
