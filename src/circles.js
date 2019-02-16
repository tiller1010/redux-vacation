import React from 'react';

const circleStyle={
  width: '10px',
  height: '10px',
  background: '#07a',
  borderRadius: '50%',
  margin: '10px',
  display: 'inline-block'
}

const Circles=()=>{
  return(
    <div className='Circles'>
      <div style={circleStyle}></div>
      <div style={circleStyle}></div>
      <div style={circleStyle}></div>
    </div>
  )
}

export default Circles;
