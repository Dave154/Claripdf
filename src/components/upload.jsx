import {useState,useCallback,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import Loader from './loader.jsx'
import JSZip from "jszip";
import imageCompression from "browser-image-compression";
import {useUniversal} from '.././context.jsx'
import {useNavigate} from 'react-router-dom'
import {FaUpload} from 'react-icons/fa6'

 const Upload = () => {
 const navigate =useNavigate()
 const {
 handleError,currentRoute,
 windowWidth,dropFile,setDropFile,
 saveas,setSaveas,isEditing,
 setIsEditing,setOcrtext, setRefinedtext,
 setCurrentRoute,saveToIndexedDB,sideWidth
}=useUniversal()
 const { register } = useForm();
  const [progress, setProgress] = useState(0);


 const uploadFile =async(files)=>{
   const formData = new FormData();
   for(const file of files){
   formData.append("files", file);
   }
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
      console.log(response.data)
      setRefinedtext(response.data.refinedText)
      navigate('/generated')
      // Save data to IndexedDB
      if(response.data.refinedText && response.data.ocrTexts){
       saveToIndexedDB('db', 'claridb', { Ocr:response.data.ocrTexts, refined: response.data.refinedText });
      }else{
        throw Error()
      }
    } catch (error) {
      console.log(error)
      handleError(error)
      setProgress(0)
    }
 }

const compressfile=async(file)=>{
  if(file.type.startsWith('image/')){
     const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedImage = await imageCompression(file, options);
    return compressedImage;
  }else{
      return file
  }

}


  const handleFileChange = async (files) => {
    let validFiles =[];
    let compressedFiles=[];
    let numberOfPdf=0;
    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/pdf',
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
      validFiles.push(file)
  }
    for (const file of validFiles){
        if(validFiles[0].type.split('/')[0] !== file.type.split('/')[0]){
          handleError('different files')
          return;
        }else if(file.type==='application/pdf'){
            numberOfPdf = numberOfPdf + 1
            if(numberOfPdf >1){
            console.log(numberOfPdf)
            handleError(`multiple Pdf`)
            return;
            }
        }
        
          const compressed= await compressfile(file)
          compressedFiles.push(compressed)
        
    }

      uploadFile(compressedFiles)
   
  };


 useEffect(()=>{

      if(dropFile){
        handleFileChange(dropFile)
        console.log(dropFile)
        setDropFile(null)
      }

 },[dropFile])



  
return (
 		<>
 		<section className={`text-stone-100 p-3 rounded text-center h-full grid place-items-center w-full transition-all duration-700`}>
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
        <p className="text-xs text-center text-red-400 mb-2">*  File size should not exceed 10MB  *</p>
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
 
 export default Upload


