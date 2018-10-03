import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

import Edge from './Edge'
import Node from './Node'

import { alignToCoeffGraph } from '../lib'
import * as Types from '../types'

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
    align: Types.align, 
    frame: PropTypes.number,
    edges: Types.edges,
    nodes: Types.nodes
  }

  constructor(props) {
    super(props);

    this.state = { frame: props.nodes.length, rNodes: {} }    
    this.rNodes = {} // Stack for rendered nodes (height, width) - goes to state after all nodes have their h, w
  
    // Handlers
    this.handleNodeMount = this.handleNodeMount.bind(this);
  }
  
  handleNodeMount(i) {
    return (el) => {
      this.rNodes[i] = { width: el.offsetWidth, height: el.offsetHeight };
    
      const lrn = Object.keys(this.rNodes).length, lpn = this.props.nodes.length;
      if (lrn === lpn) this.setState({ rNodes: this.rNodes });
    }
  }
  
  render() {
    const { align, classes, edges, frame, nodes } = this.props,
          { rNodes, scrolled, replayed } = this.state,
          isNodesRendered = nodes.length === Object.keys(rNodes).length,
          isNodeShown = (i) => i < frame,
          gX = alignToCoeffGraph(align.h) * 100 + "%", gY = alignToCoeffGraph(align.v) * 100 + "%";

    return (
      <div className={classes.graph}>
        <div className={classes.graphInner} style={{ left: gX, top: gY }}>
          {
            nodes.map((node, i) =>               
              <Node key={i} align={align}
                    isShown={isNodeShown(i)}
                    onMount={this.handleNodeMount(i)}
                    x={node.x} y={node.y}>{node.content}</Node>
            )
          }
          {
            isNodesRendered && edges.map((e, i) => {
              let headIndex = e[0], tailIndex = e[1], x;

              // Switch head_id & tail_id for the purpose of transition
              const orderIsReversed = headIndex > tailIndex;
              if (orderIsReversed) { x = headIndex; headIndex = tailIndex; tailIndex = x; }

              const head = nodes[headIndex], tail = nodes[tailIndex],
                    sHead = rNodes[headIndex], sTail = rNodes[tailIndex],
                    isEdgeShown = isNodeShown(headIndex) && isNodeShown(tailIndex);

              return <Edge key={i} align={align} isShown={isEdgeShown}
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
