import {useUniversal} from '.././context.jsx'
import MenuBar from './menubar.jsx'
 const Navigation = () => {
 	const {sideWidth}=useUniversal()
 	return (
 		<div className={`fixed top-0  z-10 w-full p-3 flex gap-4 items-center transition-all duration-700`}

 			style={{
       			 marginLeft: window.innerWidth >= 768 ? `${sideWidth}px` : '0px',
      			}}
 		>
 			<div className="md:hidden -mt-5">
 				<MenuBar/>
 			</div>
 			 <h2 className="text-2xl font-extrabold text-stone-600 leading-10 ">
 			 	ClariPdf
 			 </h2>
 		</div>
 	)
 }
 
 export default Navigation