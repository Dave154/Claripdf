import {useUniversal} from '.././context.jsx'
import MenuBar from './menuBar.jsx'
 const Navigation = () => {
 	const {sideWidth,windowWidth}=useUniversal()
 	return (
 		<div className={`fixed top-0  z-10 w-full p-3 flex gap-4 items-center transition-all duration-700 bg-white`}

 			style={{
       			 marginLeft:windowWidth>= 768 ? `${sideWidth}px` : '0px',
      			}}
 		>
 			<div className="md:hidden -mt-5">
 				<MenuBar/>
 			</div>
 			 <h2 className="text-lg font-extrabold text-stone-600 leading-10 text-center">
 			 	ClariPdf
 			 </h2>
 		</div>
 	)
 }
 
 export default Navigation