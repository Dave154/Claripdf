  
import React, {useState,useEffect,useContext,useReducer} from 'react'

const AppContext = React.createContext()

 const AppProvider =({children})=>{
  const [saveas,setSaveas]=useState(false)
  const [isEditing,setIsEditing]=useState(false)
  const [ocrtext,setOcrtext]=useState('')
  const [refinedtext, setRefinedtext] = useState('')
  const [currentRoute,setCurrentRoute] = useState('Home')
  const [dropFile,setDropFile]=useState(null)
  const [sideWidth,setSideWidth]=useState('250')
  const [toggle,setToggle]=useState(false)
  const [windowWidth,setWindowWidth]=useState(window.innerWidth)
  const [error,setError]=useState(false)
  const [errorMessage,setErrorMessage]=useState('')
  const [history,setHistory]=useState([])
  const [currentId,setCurrentId]=useState(null)
  const [saved,setSaved]=useState(false)
  const [notify,setNotify]=useState({
    bool:false,
    message:'Saved',
    type:'success'
  })
const toggleSide=()=>{
	setToggle(!toggle)
	if(toggle){
	setSideWidth('50')

}else{
	setSideWidth('250')
}
}

 const handleresize=()=>{
 		setWindowWidth(window.innerWidth)
 		setToggle(false)
 }
		useEffect(()=>{
			window.addEventListener('resize',handleresize)
			return ()=>window.removeEventListener('resize',handleresize)
		},[windowWidth])

// Save to indexedDB
		//
const openDb=(dbName, storeName) =>{
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

const deleteOldData=async (id) =>{
  const dbName= 'db'
  const storeName= 'claridb'
  const db = await openDb(dbName, storeName);

   return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id); // Delete the record by key
    request.onsuccess = () => {
      setNotify({bool:true,message:'Deleted',type:'error'})
      
      resolve();
    };
    request.onerror = () => reject(request.error);
  });

}
// Retrieve all records or retrieve but id
const getSaveddata=async(dbName, storeName,id)=> {
  const db = await openDb(dbName, storeName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = id ? store.get(id): store.getAll(); 

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = () => reject(request.error);
  });
}


// Function to save data to IndexedDB
const  saveToIndexedDB=async(dbName, storeName, data) =>{
  const db = await openDb(dbName, storeName);

  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);

  const mostRecentlyGenerated = {
    data: data,            
    timestamp: Date.now(),  
  };

  store.add(mostRecentlyGenerated);
  transaction.oncomplete = () =>{
    setSaved(true);
    setNotify({bool:true,message:'Saved',type:'success'})
  }
  transaction.onerror = () => console.error("Error saving data.");
}


  const getDataByKey=async(id)=>{
  	  const data = await getSaveddata('db', 'claridb',id)
  	  setOcrtext(data.data.Ocr)
  	  setRefinedtext(data.data.refined)
  	  setCurrentId(id)
  }

useEffect(()=>{
	setSaved(false)
	getSaveddata('db', 'claridb')
  .then(data => {
  		const tempHist=[]
  	data.map(item=>{
  		tempHist.unshift({previewTxt:item.data.refined, id:item.id,timestamp:new Date(item.timestamp).toISOString().split('T')[0] })
  	})
  	tempHist.sort((a,b)=>new Date(b.timestamp) - new Date(a.timestamp))
  	console.log(tempHist)
  	setHistory(tempHist)
  	const length=data.length-1
  	if(!ocrtext){
  	setOcrtext(data[length].data.Ocr)
  	setRefinedtext(data[length].data.refined)
  	}
  	setCurrentId(data[length].id)
  })
  .catch(error => console.error('Error retrieving data:', error));
  
},[saved])


const handleError=(err)=>{
	setError(true)
	if(err.message==='Network Error'){
		setErrorMessage('Seems like you are disconnected, check internet connection and try again')
	}else if(err==='maxfile'){
		setErrorMessage('File size should not be more than 10MB')
	}
	else if(err==='unsupported') {
			setErrorMessage('Unsupported file type')
	}else if(err ==='different files'){
       setErrorMessage('Upload Failed — All files must be of the same type. Please select files with a consistent format and try again.')
	}
	else if(err ==='multiple Pdf'){
       setErrorMessage('Only one PDF can be uploaded at a time')
   }
	else{
		setErrorMessage('Something went wrong, Try again')
	}
}




 	return <AppContext.Provider value={{
 		saveas,
 		setSaveas,
 		isEditing,
 		setIsEditing,
 		ocrtext,
 		setOcrtext,
 		refinedtext, 
 		setRefinedtext,
 		currentRoute,
 		setCurrentRoute,
		saveToIndexedDB,
		dropFile,
		setDropFile,
		sideWidth,
		setSideWidth,
		toggleSide,
		toggle,
		windowWidth,
		handleError,
		error,
		setError,
		errorMessage,
		history,
		setHistory,
		getDataByKey,
		currentId,
		deleteOldData,
		saved,
		setSaved,
    notify,
    setNotify
 	}}>
 		{children}
 	</AppContext.Provider>
 }

 const useUniversal=()=>{
 	return useContext(AppContext)
 }

 export {AppProvider,useUniversal} 