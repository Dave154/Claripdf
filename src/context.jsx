  
import React, {useState,useEffect,useContext,useReducer} from 'react'

const AppContext = React.createContext()

 const AppProvider =({children})=>{
  const [saveas,setSaveas]=useState(false)
  const [isEditing,setIsEditing]=useState(false)
  const [ocrtext,setOcrtext]=useState('')
  const [refinedtext, setRefinedtext] = useState('')
  const [currentRoute,setCurrentRoute] = useState('Home')
  const [dropFile,setDropFile]=useState(null)
  const [sideWidth,setSideWidth]=useState('200')
  const [toggle,setToggle]=useState(false)
  const [windowWidth,setWindowWidth]=useState(window.innerWidth)

const toggleSide=()=>{
	setToggle(!toggle)
	if(toggle){
	setSideWidth('50')

}else{
	setSideWidth('200')
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

const deleteOldData=async (dbName, storeName) =>{
  const db = await openDb(dbName, storeName);
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);

  const request = store.openCursor();
  const now = Date.now();
  // const tenDays = 10 * 24 * 60 * 60 * 1000; 

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const mostRecentlyGenerated = cursor.value;
      const age = now - mostRecentlyGenerated.timestamp;
        store.delete(cursor.key); 
        console.log("Deleted expired record:", mostRecentlyGenerated);
      cursor.continue();
    }
  };

  request.onerror = () => console.error("Error deleting data.");
}

// Function to save data to IndexedDB
const  saveToIndexedDB=async(dbName, storeName, data) =>{
  deleteOldData('db', 'claridb',);
  const db = await openDb(dbName, storeName);

  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);

  const mostRecentlyGenerated = {
    data: data,            
    timestamp: Date.now(),  
  };

  store.add(mostRecentlyGenerated);
  transaction.oncomplete = () => console.log("Data saved successfully.");
  transaction.onerror = () => console.error("Error saving data.");
}

const getSaveddata=async(dbName, storeName)=> {
  const db = await openDb(dbName, storeName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll(); // Retrieve all records

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = () => reject(request.error);
  });
}

useEffect(()=>{
	getSaveddata('db', 'claridb')
  .then(data => {
  	setOcrtext(data[0].data.Ocr)
  	setRefinedtext(data[0].data.refined)
  })
  .catch(error => console.error('Error retrieving data:', error));

},[])






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
		windowWidth
 	}}>
 		{children}
 	</AppContext.Provider>
 }

 const useUniversal=()=>{
 	return useContext(AppContext)
 }

 export {AppProvider,useUniversal} 