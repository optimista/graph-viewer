import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { Graph } from './components'
import * as Types from './types'

const styles = {
  root: {
    cursor: "pointer",
    height: "100%",
    position: "absolute",
    width: "100%",

    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    KhtmlUserSelect: "none",
    MozUserSelect: "none",
    MsUserSelect: "none",
    UserSelect: "none"
  }  
}

// Component GraphViewer concerns the basic playing interaction of user with the graph (without UI)
// Component Graph concerns the rendering of the graph
class GraphViewer extends Component {  
  static propTypes = {
    align: Types.align,
    edges: Types.edges,
    nodes: Types.nodes
  }

  constructor(props) {
    super(props);

    this.state = { frame: Object.keys(props.nodes).length }    
  
    // Handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleWheel = this.handleWheel.bind(this);

    // Rest
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.set = this.set.bind(this);
  }

  prev() {
    const frame = this.state.frame;
    if (frame > 1) this.setState({ frame: frame - 1 });
  }

  next() {
    const frame = this.state.frame, l = Object.keys(this.props.nodes).length;
    if (frame < l) this.setState({ frame: frame + 1, scrolled: true });
  }  
  
  set(frame) {
    const { nodes } = this.props,
          ln = Object.keys(nodes).length;
  
    if(frame > ln) frame = ln;
    if(frame < 0) frame = 0;

    this.setState({ frame: frame });
  }
  
  handleClick(e) {
    this.next();
  }

  handleWheel(e) {
    e.preventDefault();

    const scrollingDown = e.deltaY > 0;
    scrollingDown ? this.next() : this.prev();
  }

  render() {
    const { align, children, classes, edges, nodes } = this.props,
          { frame } = this.state;
          
    return (
      <div className={classes.root} onClick={this.handleClick} onWheel={this.handleWheel}>
        <Graph align={align} edges={edges} frame={frame} nodes={nodes} />
        {children && children(frame, this.set)}
      </div>
    )
  }
}

export default withStyles(styles)(GraphViewer)
export { Types as Types }
