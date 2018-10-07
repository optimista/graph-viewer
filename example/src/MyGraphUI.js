import React, { Component } from 'react'

import { withViewer } from 'graph-viewer'

class MyGraphUI extends Component {
  render () {
    const { viewer } = this.props,
          { frame, set } = viewer;

    return (
      <div style={{ position: "absolute", right: 0, bottom: 0 }}>
        { frame === 0 && <p>Tap or scroll to reveal the graph!</p> }
        <button onClick={() => set(0)}>Replay</button>
      </div>
    )
  }
}

export default withViewer(MyGraphUI)
