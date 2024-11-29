  
import React, {useState,useEffect,useContext,useReducer} from 'react'

const AppContext = React.createContext()

 const AppProvider =({children})=>{
  const [saveas,setSaveas]=useState(false)
  const [isEditing,setIsEditing]=useState(false)


 	return <AppContext.Provider value={{
 		saveas,
 		setSaveas,
 		isEditing,
 		setIsEditing
 	}}>
 		{children}
 	</AppContext.Provider>
 }

 const useUniversal=()=>{
 	return useContext(AppContext)
 }

 export {AppProvider,useUniversal} 