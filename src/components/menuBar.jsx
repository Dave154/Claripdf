  import { FaBarsStaggered } from "react-icons/fa6";
  import {useUniversal} from '.././context.jsx'

 const MenuBar = () => {
  	const {toggleSide}=useUniversal()

 	return (
 		<div className="flex justify-between pt-5 px-4 h-[40px]">
	  				<button className="text-lg text-stone-600"
	  					onClick={toggleSide}
	  				><FaBarsStaggered/></button>
	  			</div>
 	)
 }
 
 export default MenuBar