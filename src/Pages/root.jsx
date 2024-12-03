import React from 'react'
import Upload from '.././components/upload.jsx'
import {useUniversal} from '.././context.jsx'
const Root = () => {
  const {windowWidth,sideWidth } = useUniversal()
  return (
    <div className='h-screen transition-all duration-700'
    style={{
             marginLeft:windowWidth>= 768 ? `${sideWidth}px` : '0px',
            }}
    >
      <Upload/>
    </div>
  )
}

export default Root