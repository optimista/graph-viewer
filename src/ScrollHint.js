import React from 'react'
import classnames from 'classnames'

import scroll from './scroll.png'
import styles from './ScrollHint.css'

const ScrollHint = ({ isShown }) => (
  <div className={classnames(styles.scrollHint, { [styles.scrollHintIsHidden]: !isShown })}>
    <img alt="scroll" className={styles.scrollHintImg} src={scroll} />
    <p className={styles.scrollHintText}>scroll</p>
  </div>
)

export default ScrollHint
