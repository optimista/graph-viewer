import React from 'react'
import classnames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import Replay from '@material-ui/icons/Replay'
import Tooltip from '@material-ui/core/Tooltip'

import styles from './ButtonReplay.css'

const ButtonReplay = ({ className, isPulsing, isShown, onClick }) => (
  <div className={classnames(styles.replay, className, { [styles.replayIsHidden]: !isShown })} onClick={onClick}>
    <Tooltip placement="left" title="replay">
      <IconButton classes={{ root: classnames({ [styles.replayIsPulsing]: isPulsing }) }}>
        <Replay />
      </IconButton>
    </Tooltip>
  </div>
)

export default ButtonReplay
