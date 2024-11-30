 import {useState} from 'react'
 import {useUniversal} from '.././context.jsx'
 const Preview = ({text}) => {
 	const [options,setOptions]=useState(false)
 	const {setSaveas,setIsEditing} =useUniversal()
 	return (
 		<div className="w-full grid place-items-between py-5 ">
            <p className="font-bold text-lg">
              Text generated from pdf, see below
            </p>
            <div className="border grid place-items-between rounded-xl p-3 bg-white w-full">
            <p className= 'h-72 line-clamp-6 overflow-hidden text-left'>
              {text}
            </p>
              <div className="flex justify-between items-center relative">
              {
              	options && 
              <div className="absolute -top-20 right-20 rounded border bg-white z-10 shadow bg-stone-100">
              	<p className="px-4  py-2 border-b cursor-pointer  hover:bg-stone-300"
              		onClick={()=>{
              			setIsEditing(true)
              		}}
              	>View and Edit</p>
              	<p className="px-4 py-2 cursor-pointer hover:bg-stone-300"
              		onClick={()=>setSaveas(true)}
              	>
              		Save text as
              	</p>
              </div>
              }
               <p className=" font-bold text-lg"> Generated pdf</p>
               <i className='rotate-90 text-4xl font-extrabold cursor-pointer'
               	onClick={()=>setOptions(!options)}
               >...</i>
              </div>
            </div>
            </div>
 	)
 }
 
 export default Preview