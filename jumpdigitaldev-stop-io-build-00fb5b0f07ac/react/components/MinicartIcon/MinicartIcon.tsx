import React, { useState, useEffect } from 'react'
import useValidChangeHeader from '../../hooks/useValidChangeHeader'
import { ADD_CLASS, REMOVE_CLASS, updateFocusClassHeader } from '../../utils/updateFocusClassHeader'
import styles from './styles.css'

const MinicartIcon = () => {
  const [ show, setShow ] = useState(false)
  const { isValid } = useValidChangeHeader()

  useEffect(() => {
    if( !isValid ) return
    updateFocusClassHeader(show ? ADD_CLASS : REMOVE_CLASS)
  }, [show])
  
  return (
    <div className={`pointer ${styles.minicartIcon}`} onClick={() => {
      if( !isValid ) return
      setShow(true)
      setTimeout(() => {
        const overlayMinicart = document.querySelector('.vtex-minicart-2-x-portalWrapper .fixed')
        if( overlayMinicart ) {
          const overlayEventClick = () => {
            setShow(false)
          }
          overlayMinicart.addEventListener('click', overlayEventClick)
        }
      }, 500)
    }}>  
    </div>
  )
}

export default MinicartIcon
