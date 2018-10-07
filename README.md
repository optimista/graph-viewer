# graph-viewer

> An interactive player/viewer of graphs (mind maps)

![Alt Text](graph-viewer.gif)

[![NPM](https://img.shields.io/npm/v/graph-viewer.svg)](https://www.npmjs.com/package/graph-viewer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save graph-viewer
```

```bash
yarn add graph-viewer
```


## Usage

```jsx
import React, { Component } from 'react'

import GraphViewer from 'graph-viewer'

export default class App extends Component {
  render () { 
    const edges = [[0, 1], [1, 2]],
          nodes = [
            { content: "Unveil", x: 30, y: 20 },
            { content: "the", x: 160, y: 45 },
            { content: "unseen", x: 50, y: 80 }
          ];
    
    return <GraphViewer align={{ h: "left", v: "top" }} edges={edges} nodes={nodes} />    
  }
}
```

or

```jsx
import React, { Component } from 'react'

import { withViewer } from 'graph-viewer'

class MyGraphUI extends Component {
  render () {
    const { viewer } = this.props,
          { frame, set } = viewer;

    return (
      <div>
        { frame === 0 && <p>Tap or scroll to reveal the graph!</p> }
        <button onClick={() => set(0)}>Replay</button>
      </div>
    )
  }
}

export default withViewer(MyGraphUI)
```

```
export default class App extends Component {
  render () { 
    const edges = [[0, 1], [1, 2]],
          nodes = [
            { content: "Unveil", x: 30, y: 20 },
            { content: "the", x: 160, y: 45 },
            { content: "unseen", x: 50, y: 80 }
          ];
    
    return <MyGraphUI align={{ h: "left", v: "top" }} edges={edges} nodes={nodes} />    
  }
}
```

## License

MIT © [optimista](https://github.com/optimista)
