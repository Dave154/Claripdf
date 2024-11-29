 import React from 'react'
 
 const Loader = ({text,open}) => {
  
  if(open){
  	
 	return (
 		<div className='grid place-items-center'>
 			<div className="loader"></div>
 			<p className="">{text}</p>

 		</div>
 	
 	)
  }
 	
 }
 
 export default Loader