import React, { Fragment } from 'react'

import * as Types from './types'
import withViewer from './withViewer'

const GraphViewer = ({ viewer }) => <Fragment />

export default withViewer(GraphViewer)
export { Types as Types, withViewer as withViewer }
