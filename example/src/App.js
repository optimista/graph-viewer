import React, { Component } from 'react'

import GraphViewer from 'graph-viewer'

export default class App extends Component {
  render () {
    const graph = { nodes: [
      { content: "Unveil", x: 30, y: 20 },
      { content: "the", x: 160, y: 45 },
      { content: "unseen", x: 50, y: 80 }
    ]};

    return <GraphViewer graph={graph} />    
  }
}
