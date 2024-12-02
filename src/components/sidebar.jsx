  import {useState,useEffect} from 'react'
  import { GoHome,GoHomeFill } from "react-icons/go";
  import { IoDocumentTextOutline ,IoDocumentText } from "react-icons/io5"
  import {useUniversal} from '.././context.jsx'
  import {Link,useNavigate} from 'react-router-dom'
  import MenuBar from './menuBar.jsx'
  const Sidebar = () => {
  	const navigate=useNavigate()
  	const {currentRoute,sideWidth,toggleSide,toggle,windowWidth}=useUniversal()

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
  		<>
		<section className={`fixed left-0 top-0 ${toggle && 'inset-0'} md:inset-auto md:left-0 md:top-0 z-20   h-full bg-[rgba(100,100,100,.2)]`}
			onClick={toggleSide}
		>
			
	  		<aside className={`bg-stone-50 h-full overflow-x-hidden shadow transition-all duration-700 border-r`}
	  			style={{
       			 width:windowWidth >= 768 ? `${sideWidth}px` : toggle ? `${sideWidth}px`:'0px',
      			}}
	  		>

	  			<MenuBar/>

	  			<ul className="flex flex-col gap-5 mt-16 px-3">
	  				{
	  					sidebarStuffs.map((item,index)=>{
	  						const {name,icon,route,iconActive}=item
	  						return <li className={`group relative grid py-1  hover:bg-stone-200 rounded-xl ${name===currentRoute && 'bg-stone-100'}`} key={index} >
	  						  <Link to={route} className='flex gap-5 items-center justify-between'
	  						  	onClick={toggleSide}
	  						  >
	  							<i className="text-2xl basis-[10%]">
	  								{
	  									name===currentRoute ?
	  									iconActive
	  									: icon
	  								}
	  							</i>
	  							<p className="py-1 text-stone-700 basis-[90%]">{name}</p>
	  						  </Link>
	  						</li>
	  					})
	  				}
	  			</ul>
	  		</aside>
		</section>
  		</>
  	)
  }
  
  export default Sidebar