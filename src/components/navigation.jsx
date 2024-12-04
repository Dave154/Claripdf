import {useUniversal} from '.././context.jsx'
import MenuBar from './menuBar.jsx'
 const Navigation = () => {
 	const {sideWidth,windowWidth}=useUniversal()
 	return (
 		<div className={`fixed top-0  z-10 w-full  p-2 flex gap-4 items-center  transition-all duration-700 bg-white`}

 			style={{
       			 marginLeft:windowWidth>= 768 ? `${sideWidth}px` : '0px',
      			}}
 		>
 			<div className="md:hidden ">
 				<MenuBar/>
 			</div>
 			 <h2 className={` ${ (windowWidth>= 768 && sideWidth ==='250' )&& 'hidden'} text-xl font-extrabold text-stone-600 leading-10 text-center`}>
 			 	CP
 			 </h2>
 		</div>
 	)
 }
 
 export default Navigation