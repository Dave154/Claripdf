import './App.css'
import Root from './Pages/root.jsx'
import Generated from './Pages/generated.jsx'
import Navigation from './components/navigation.jsx'
import Notification from './components/notification.jsx'
import Sidebar from './components/sidebar.jsx'
import Error from './components/error.jsx'
import {Routes,Route,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useUniversal} from './context.jsx'
import { FaQuestion } from "react-icons/fa6";

const App =()=> {
  const [isDragging, setIsDragging] = useState(false);
  const {setDropFile}=useUniversal()
  const navigate= useNavigate()

     const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragging(false)
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true)
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false)

        const dataTransfer = e.dataTransfer;
        setDropFile(dataTransfer.files)
        navigate('/')
    };
  return (
    <main 
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
         {/*Drag and drop*/}
      {
        isDragging &&
      <div className="fixed bg-[rgba(10,10,10,.2)] inset-0 z-30 backdrop-blur p-5"
      onDragLeave={handleDragLeave}
        
      >
        <div className="border-8 border-dashed place-items-center grid place-items-center h-full font-semibold text-xl"
         
        >
        Drop files here 
        </div>
      </div>
      }
      {/**/}
      <Navigation/>
      <Notification/>
      <Routes>
        <Route path='/' element={<Root/>}/>
        <Route path='/generated' element={<Generated/>}/>
      </Routes>
      <div className="fixed bottom-1 group right-1">
        <span className="text-sm bg-white border rounded-xl shadow px-2 py-1 absolute -left-8 invisible opacity-0 group-hover:opacity-100 group-hover:-top-8 group-hover:visible transition-opacity duration-500">Help</span>
      <button className="rounded-full border w-7 h-7 grid place-content-center bg-white hover:shadow-xl hover:bg-stone-50 text-sm ">
        <FaQuestion/>
      </button>
      </div>
      <Sidebar/>
      <Error/>
    </main>
  )
}

export default App
