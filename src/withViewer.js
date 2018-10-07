import React, { Component, Fragment } from 'react'
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

// HOC withViewer concerns the basic playing interaction of user with the graph (without UI)
// Component Graph concerns the rendering of the graph
const withViewer = (WrappedComponent) => {
  class WithViewer extends Component {  
    static propTypes = {
      graph: Types.graph,
      start: Types.start,
      onChange: PropTypes.func
    }

    constructor(props) {
      super(props);

      this.state = { frame: parseInt(this.props.start, 10) || props.graph.nodes.length }    
  
      // Handlers
      this.handleClick = this.handleClick.bind(this);
      this.handleWheel = this.handleWheel.bind(this);

      // Rest
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
      this.set = this.set.bind(this);
    }

    prev() {
      const { frame } = this.state;
      if(frame > 1) this.set(frame - 1);
    }

    next() { this.set(this.state.frame + 1); }  
    
    set(frame) {
      const nodes = this.props.graph.nodes,            
            ln = nodes.length;
  
      if(0 <= frame && frame <= ln) {
        this.setState({ frame: frame });
        this.props.onChange(frame);
      }
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
      const { children, classes, graph } = this.props,
            { frame } = this.state,
            viewer = { frame: frame, set: this.set };      
          
      return (
        <Fragment>
          <div className={classes.root} onClick={this.handleClick} onWheel={this.handleWheel}>
            <Graph frame={frame} graph={graph} />
          </div>
          <WrappedComponent {...this.props} viewer={viewer} />
        </Fragment>
      )
    }
  }

  WithViewer.defaultProps = { onChange: () => {} }

  return withStyles(styles)(WithViewer)
}

export default withViewer;
