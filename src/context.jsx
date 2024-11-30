  
import React, {useState,useEffect,useContext,useReducer} from 'react'

const AppContext = React.createContext()

 const AppProvider =({children})=>{
  const [saveas,setSaveas]=useState(false)
  const [isEditing,setIsEditing]=useState(false)
  const [ocrtext,setOcrtext]=useState('ererer')
  const [refinedtext, setRefinedtext] = useState('')


 	return <AppContext.Provider value={{
 		saveas,
 		setSaveas,
 		isEditing,
 		setIsEditing,
 		ocrtext,
 		setOcrtext,
 		refinedtext, 
 		setRefinedtext
 	}}>
 		{children}
 	</AppContext.Provider>
 }

 const useUniversal=()=>{
 	return useContext(AppContext)
 }

 export {AppProvider,useUniversal} 