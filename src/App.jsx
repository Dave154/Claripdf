import './App.css'
import Root from './Pages/root.jsx'
import Generated from './Pages/generated.jsx'
import Navigation from './components/navigation.jsx'
import Sidebar from './components/sidebar.jsx'
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
      // onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
         {/*Drag and drop*/}
      {
        isDragging &&
      <div className="fixed bg-[rgba(10,10,10,.2)] inset-0 z-30 backdrop-blur p-5"
        
      >
        <div className="border-8 border-dashed place-items-center grid place-items-center h-full font-semibold text-xl"
         
        >
        Drop files here 
        </div>
      </div>
      }
      {/**/}
      <Navigation/>
      <Routes>
        <Route path='/' element={<Root/>}/>
        <Route path='/generated' element={<Generated/>}/>
      </Routes>
      <button className="fixed bottom-4 right-4 rounded-full border w-7 h-7 grid place-content-center bg-white hover:shadow-xl hover:bg-stone-50 text-sm ">
        <FaQuestion/>
      </button>
      <Sidebar/>
    </main>
  )
}

export default App
