  import { FaBarsStaggered } from "react-icons/fa6";
  import {useUniversal} from '.././context.jsx'

 const MenuBar = () => {
  	const {currentRoute,sideWidth,toggleSide}=useUniversal()

 	return (
 		<div className="flex justify-between pt-5 px-5">
	  				<button className="text-lg text-stone-600"
	  					onClick={toggleSide}
	  				><FaBarsStaggered/></button>
	  			</div>
 	)
 }
 
 export default MenuBar