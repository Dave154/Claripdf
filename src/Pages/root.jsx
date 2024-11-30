 import {useState,useCallback,useEffect} from 'react'
 import { useForm } from 'react-hook-form';
 import axios from 'axios'
 import Loader from '.././components/loader.jsx'
import JSZip from "jszip";
import imageCompression from "browser-image-compression";
import {useUniversal} from '.././context.jsx'
import {useNavigate} from 'react-router-dom'
 

 const Root = () => {
 const navigate =useNavigate()
 const {saveas,setSaveas,isEditing,setIsEditing,setOcrtext, setRefinedtext}=useUniversal()
 const { register } = useForm();
 const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);




  // FILE COMPRESSION
  const fileToBlob = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(new Blob([reader.result]));
    reader.onerror = reject;

    reader.readAsArrayBuffer(file); 
  });
};

const compressFile = async (file) => {
  const blob = await fileToBlob(file);

  const zip = new JSZip();
  zip.file(file.name, blob); 
  const compressedBlob = await zip.generateAsync({ type: "blob" });
  return compressedBlob;
};

 const uploadFile =async(formData)=>{
  try {
      setProgress(1); 
      console.log(formData)
      const response = await axios.post('https://ocr-backend-jmcd.onrender.com/api/uploadFile ', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent)
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });
      console.log(response.data)
      setOcrtext(response.data.ocrTexts)
      setRefinedtext(response.data.refinedGPTText)

      navigate('/generated')
    } catch (error) {
      console.error('Upload failed', error);
      alert('File upload failed!');
      setProgress(0)
    }
 }


const handleImageUpload = async (file) => {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedImage = await imageCompression(file, options);

    const formData = new FormData();
    formData.append("file", compressedImage, file.name);
    await uploadFile(formData);
  } catch (error) {
    console.error("Error compressing image:", error);
  }
};

const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  await uploadFile(formData);
};


  const handleFileChange = async (files) => {
    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxFileSize = 10 * 1024 * 1024; 

    // Validate files
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        alert(`Unsupported file type: ${file.name}`);
        return;
      }
      if (file.size > maxFileSize) {
        alert(`File size should not be more than 10MB: ${file.size/(1024*1024)} :${file.name}`);
        return;
      }
      if (file.type.startsWith("image/")) {
      await handleImageUpload(file);
    } else {
      await handleFileUpload(file);
    }
  }
   
  };

   // Show drop area when dragging
  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  // Add drag listeners to the entire window
  useEffect(() => {
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDragLeave);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDragLeave);
    };
  }, []);


  
return (
 		<>
 		<section className='text-stone-100 p-3 shadow rounded text-center h-screen grid place-items-center'>
	 		<div className=" w-full h-full p-5 rounded-lg md:rounded-l-lg flex flex-col">
 			<div className=" text-stone-900 max-w-64 mx-auto flex-grow flex items-center justify-center">
 			{
 				( progress > 0) ?
 				<Loader open={true} text='Generating text from pdf, please wait...'/>
 				: progress === 100 ? 
        <p className="">Upload Successful</p>
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

		      <label htmlFor="file"  className={`block  p-2 w-full max-w-[30rem] rounded-2xl mx-auto  ${progress >0 ? 'bg-stone-300 cursor-none' :'bg-stone-900 cursor-pointer'}`}>Upload pdf/image</label>

    		</form>
 			 
	 		</div>
 			
 		</section>
 		</>
 	)
 }
 
 export default Root


