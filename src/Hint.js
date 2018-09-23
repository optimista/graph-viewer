import React from 'react'
import classnames from 'classnames'
import TouchApp from '@material-ui/icons/TouchApp'
import UnfoldMore from '@material-ui/icons/UnfoldMore'

import { isMobileOrTablet } from './lib'
import scroll from './scroll.png'
import styles from './Hint.css'

const Hint = ({ isShown }) => {
  const mobileOrTablet = isMobileOrTablet(),
        text = mobileOrTablet ? "tap" : "scroll";

  return <div className={classnames(styles.hint, { [styles.hintIsHidden]: !isShown })}>
    { mobileOrTablet ? <TouchApp fontSize="large" /> : <UnfoldMore fontSize="large" /> }
    <p className={styles.hintText}>{text}</p>
  </div>
}

export default Hint
