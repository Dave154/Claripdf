  import { GoHome,GoHomeFill } from "react-icons/go";
  import { IoDocumentTextOutline ,IoDocumentText } from "react-icons/io5"
  import {useUniversal} from '.././context.jsx'
  import {Link} from 'react-router-dom'

  const Sidebar = () => {

  	const {currentRoute}=useUniversal()

  		const sidebarStuffs=[
  			 {
  			 	name:'Home',
  			 	icon:<GoHome />,
  			 	iconActive:<GoHomeFill/>,
  			 	route:'/'
  			 },
  			  {
  			 	name:'Generated',
  			 	icon:<IoDocumentTextOutline />,
  			 	iconActive:<IoDocumentText  />,
  			 	route:'/Generated'
  			 },
  			]

  	return (
  		<aside className="fixed right-0 top-0 bg-stone-100 h-full mt-16 w-10 rounded-l-xl shadow grid  py-5">
  			<ul className="flex flex-col gap-5">
  				{
  					sidebarStuffs.map((item,index)=>{
  						const {name,icon,route,iconActive}=item
  						return <li className="group relative grid justify-center bg-stone-100 py-1" key={index}>
  							<p className="absolute -z-10 rounded-xl px-5 py-1 bg-stone-300 text-stone-700 opacity-0 group-hover:opacity-100 group-hover:right-full group-hover:mr-4 transition-opacity delay-300">{name}</p>
  						  <Link to={route}>
  							<i className="text-2xl">
  								{
  									name===currentRoute ?
  									iconActive
  									: icon
  								}
  							</i>
  						  </Link>
  						</li>
  					})
  				}
  			</ul>
  		</aside>
  	)
  }
  
  export default Sidebar