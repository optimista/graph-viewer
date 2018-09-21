import React, { Component } from 'react'

import GraphViewer from 'graph-viewer'

export default class App extends Component {
  render () {    
    const edges = { 1: { head_id: 1, tail_id: 2 },  2: { head_id: 2, tail_id: 3 } },
          nodes = {
            1: { content: "Unveil", order: 1, x: 30, y: 20 },
            2: { content: "the", order: 2, x: 160, y: 45 },
            3: { content: "unseen", order: 3, x: 50, y: 80 }
          };

    return <GraphViewer align={{ h: "left", v: "top" }} edges={edges} nodes={nodes} />    
  }
}
