 import {useUniversal} from '.././context.jsx'
 import { MdErrorOutline } from "react-icons/md";

  const ErrorComp = () => {
 	const {error,setError,errorMessage}=useUniversal()

 	if(error){

 	return (
 		<div className='fixed inset-0 z-20 bg-[rgba(10,10,10,.2)] grid place-items-center '>
 			<div className="bg-[rgba(250,240,240)] rounded-xl	border-red-300 border-2 items-center gap-4 flex flex-col justify-between w-full max-w-64 min-h-32 shadow-inner p-3 relative">
 				<i className=" text-red-500 text-2xl">
 					<MdErrorOutline/>
 				</i>
 				<p className="text-center text-sm text-red-800">{errorMessage}</p>
 				<button className="bg-red-700 rounded-xl w-full text-stone-100 h-fit"
 					onClick={()=>setError(false)}
 				>Cancel</button>
 			</div>
 		</div>
 	)
 	}
 }
 
 export default ErrorComp