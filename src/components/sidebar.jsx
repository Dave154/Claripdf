  import {useState,useEffect} from 'react'
  import { GoHome,GoHomeFill } from "react-icons/go";
  import { IoDocumentTextOutline ,IoDocumentText } from "react-icons/io5"
  import {FaHistory} from 'react-icons/fa'
  import {useUniversal} from '.././context.jsx'
  import {Link,useNavigate} from 'react-router-dom'
  import MenuBar from './menuBar.jsx'
  import { FiDelete } from "react-icons/fi";
  const Sidebar = () => {
  	const navigate=useNavigate()
  	const {setOcrtext,setRefinedtext,currentRoute,sideWidth,toggleSide,toggle,windowWidth,history,getDataByKey,currentId,deleteOldData,setHistory}=useUniversal()
  	const [historyDates,setHistoryDates]=useState([])
  	const today=new Date().toISOString().split('T')[0]
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
  			useEffect(()=>{
  				const temphistoryDates= history.map(item=>item.timestamp)
  				setHistoryDates(Array.from(new Set(temphistoryDates)).sort((a,b)=>a))
  			},[history])
  	return (
  		<>
		<section className={`fixed left-0 top-0 ${toggle && 'inset-0'} md:inset-auto md:left-0 md:top-0 z-20   h-full bg-[rgba(100,100,100,.2)]`}
			onClick={(e)=>{
				if(e.target.tagName==='SECTION' )
				toggleSide()
			}
		}
		>
			
	  		<aside className={`bg-stone-50 h-full overflow-x-hidden shadow transition-all duration-700 border-r flex flex-col gap-3 `}
	  			style={{
       			 width:windowWidth >= 768 ? `${sideWidth}px` : toggle ? `${sideWidth}px`:'0px',
      			}}
	  		>
	  		<div className="flex items-center w-full mt-3">
	  			<MenuBar/>
	  			<p className="text-xl font-extrabold text-stone-600 leading-10 text-center">Claripdf</p>
	  			
	  		</div>
	  			<div className="flex flex-col px-2 gap-4 flex-1 overflow-y-auto overflow-x-hidden">
			  			<ul className="flex flex-col gap-3">
			  				{
			  					sidebarStuffs.map((item,index)=>{
			  						const {name,icon,route,iconActive}=item
			  						return <li className={`group relative grid py-1 px-2 ${ sideWidth === '250'&& 'hover:bg-stone-200 rounded-xl'}`} key={index} >
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
			  							<p className={`py-1 text-stone-700 basis-[90%] ${name===currentRoute && 'font-semibold'}`}>{name}</p>
			  						  </Link>
			  						</li>
			  					})
			  				}
			  			</ul>
			  			 
			  			<div className={`${(windowWidth >= 768 && sideWidth !=='50') && 'invisible opacity-0' } transition duration-500 px-3`} onClick={toggleSide}>
			  				<FaHistory/>
			  			</div>
			  			 {
			  			 	history.length > 0 ?
			  			<div className={`flex flex-col gap-5 ${sideWidth ==='50' && 'invisible h-0 opacity-0 overflow-hidden'}  transition duration-500 delay-200`}>

			  				{
			  					historyDates.map(date=>{
			  						
			  						return <ul className="grid gap-3" key={date}>
			  						 	<p className="font-bold text-sm whitespace-nowrap">
			  						 		{
			  						 			date=== today ? 'Today':date
			  						 		}
			  						 	</p>

			  						 	<ul className="flex flex-col gap-2">
			  						 		{
			  						 			history.map(item=>{
			  						 				if(item.timestamp === date)
			  						 				return <li className={`group flex justify-between gap-5 items-center text-lg cursor-pointer py-1 px-2 hover:bg-stone-200 rounded-lg ${(item.id===currentId && currentRoute=== 'Generated')&&'bg-stone-200' }`} key={item.id}
			  						 					onClick={()=>{
			  						 						navigate('/generated')
			  						 						getDataByKey(item.id)
			  						 					}}
			  						 			>
			  						 			<p className="truncate whitespace-nowrap w-[150px] text-sm">
			  						 				{item.previewTxt?.replace(/<[^>]+>/g, '')}
			  						 			</p> 
			  						 			<i className="text-stone-400 invisible group-hover:visible hover:text-red-400"
			  						 				onClick={()=>{
			  						 					deleteOldData(item.id)
			  						 					if(item.id === currentId){
			  						 						setOcrtext('')
			  						 						setRefinedtext('')
			  						 					}
			  						 					const temp=history.filter(hist=> hist.id !==item.id)
			  						 					setHistory(temp)
			  						 				}
			  						 			}
			  						 			><FiDelete/> </i>
			  						 			</li>
			  						 			})
			  						 		}
			  						 	</ul>
			  						</ul>
			  					})	
			  				}
			  			</div> :

			  			<p className={`px-2  ${sideWidth ==='50' && 'invisible h-0 opacity-0 overflow-hidden'}  transition duration-500 delay-200`}>No history</p>
			  			 }
	  			</div>
	  		</aside>
		</section>
  		</>
  	)
  }
  
  export default Sidebar