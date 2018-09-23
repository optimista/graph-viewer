import React from 'react'
import classnames from 'classnames'
import ReplayIcon from '@material-ui/icons/Replay'
import Tooltip from '@material-ui/core/Tooltip'

import styles from './ButtonReplay.css'

const ButtonReplay = ({ className, isShown, onClick }) => (
  <div className={classnames(styles.replay, className, { [styles.replayIsHidden]: !isShown })} onClick={onClick}>
    <Tooltip classes={{ tooltip: styles.tooltip }} placement="left" title="replay">
      <ReplayIcon className={styles.replayIcon} />          
    </Tooltip>
  </div>
)

export default ButtonReplay
