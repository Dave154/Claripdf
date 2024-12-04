 import {useState,useEffect} from 'react'
 import {CiCircleRemove } from 'react-icons/ci'
 import {FaCheck} from 'react-icons/fa'
 import {MdErrorOutline} from 'react-icons/md'
 import {useUniversal} from '.././context.jsx'
 const Notification = () => {
 	const {notify,setNotify}=useUniversal()
 	useEffect(()=>{
 		const timer=setTimeout(()=>{
 			setNotify({...notify,bool:false})
 		},3000)
 		return ()=> clearTimeout(timer)
 	},[notify])
 	return (
 		<div className={`border ${notify.type==='success' ?'border-green-300 bg-green-50 ':'border-red-50  bg-red-100 '} fixed top-4 shadow z-40 h-10 overflow-hidden rounded-lg min-w-44 flex justify-between items-center px-3 ${!notify.bool ? 'translate-x-full right-0':'right-2'} transition-all duration-500 `}>
 			<div className="flex items-center gap-3">
 			<i className={`text-sm ${notify?.type==='success'?'text-green-400':'text-red-400'}`}>
 			{
 				notify?.type==='success'?
 			<FaCheck/>
 			:<MdErrorOutline/>
 			}
 			</i>
 			<p className="">{notify.message}</p>
 			</div>
 			<i className=""
 			onClick={()=>setNotify({...notify,bool:false})}
 			><CiCircleRemove /></i>
 		</div>
 	)
 }
 
 export default Notification