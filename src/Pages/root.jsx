 import {useState,useCallback,useEffect} from 'react'
 import { useForm } from 'react-hook-form';
 import axios from 'axios'
 import Loader from '.././components/loader.jsx'
import JSZip from "jszip";
import imageCompression from "browser-image-compression";
import {useUniversal} from '.././context.jsx'
import {useNavigate} from 'react-router-dom'
  import {FaUpload} from 'react-icons/fa6'

 const Root = () => {
 const navigate =useNavigate()
 const {
 handleError,
 windowWidth,dropFile,setDropFile,
 saveas,setSaveas,isEditing,
 setIsEditing,setOcrtext, setRefinedtext,
 setCurrentRoute,saveToIndexedDB,sideWidth
}=useUniversal()
 const { register } = useForm();
  const [progress, setProgress] = useState(0);

//   // FILE COMPRESSION
//   const fileToBlob = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = () => resolve(new Blob([reader.result]));
//     reader.onerror = reject;

//     reader.readAsArrayBuffer(file); 
//   });
// };

// const compressFile = async (file) => {
//   const blob = await fileToBlob(file);

//   const zip = new JSZip();
//   zip.file(file.name, blob); 
//   const compressedBlob = await zip.generateAsync({ type: "blob" });
//   return compressedBlob;
// };

 const uploadFile =async(formData)=>{
  try {
      setProgress(1); 
      const response = await axios.post('https://ocr-backend-jmcd.onrender.com/api/uploadFile ', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });
      setOcrtext(response.data.ocrTexts)
      setRefinedtext(response.data.refinedGPTText)
      navigate('/generated')
      // Save data to IndexedDB
      saveToIndexedDB('db', 'claridb', { Ocr:response.data.ocrTexts, refined: response.data.refinedGPTText });
    } catch (error) {
      console.log(error)
      handleError(error)
      setProgress(0)
    }
 }


const handleImageUpload = async (files) => {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedImage = await imageCompression(files, options);

    const formData = new FormData();
    formData.append("files", compressedImage, files.name);
    await uploadFile(formData);
  } catch (error) {
    console.error("Error compressing image:", error);
  }
};
 
 // FOR PDF'S
const handleFileUpload = async (files) => {
  const formData = new FormData();
  formData.append("files", files);

  await uploadFile(formData);
};


  const handleFileChange = async (files) => {
    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxFileSize = 10 * 1024 * 1024; 

    // Validate files
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        handleError('unsupported')
        return;
      }
      if (file.size > maxFileSize) {
        handleError('maxfile')
        return;
      }
      if (file.type.startsWith("image/")) {
      await handleImageUpload(file);
    } else {
      await handleFileUpload(file);
    }
  }
   
  };


 useEffect(()=>{

      if(dropFile){
        handleFileChange(dropFile)
        console.log(dropFile)
        setDropFile(null)
      }
    setCurrentRoute('Home')

 },[dropFile])



  
return (
 		<>
 		<section className={`text-stone-100 p-3 shadow rounded text-center h-screen grid place-items-center transition-all duration-700`}
      style={{
             marginLeft: windowWidth >= 768 ? `${sideWidth}px` : '0px',
            }}
    >
	 		<div className=" w-full h-full p-5 rounded-lg md:rounded-l-lg flex flex-col">
 			<div className=" text-stone-900 max-w-64 mx-auto flex-grow flex items-center justify-center">
 			{
 				( progress > 0) ?
 				<Loader open={true} text={  progress !==100 ? 'Uploading file....': 'Generating text from pdf, please wait...'}/>
 				:
 			<p>
 				Upload a pdf file or series of images in order and let us do the rest
 			</p>
 			}
 			</div>
 			
 			 <form>
		      <input
		        type="file"
		        id="file"
		        multiple
		        hidden
            disabled={progress>0}
		        {...register('files', {
		          onChange: (e) => handleFileChange(e.target.files),
		        })}
		      />

		      <label htmlFor="file"  className={`flex gap-6 items-center justify-center  p-2 w-full max-w-[30rem] rounded-2xl mx-auto  ${progress >0 ? 'bg-stone-300 cursor-none' :'bg-stone-900 cursor-pointer'}`}>
          <i className="text-sm">
          <FaUpload/>
          </i>
          <p className="">
          Upload pdf/image
          </p>
          </label>

    		</form>
 			 
	 		</div>
 			
 		</section>
 		</>
 	)
 }
 
 export default Root


