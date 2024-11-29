 import {useState,useCallback,useEffect} from 'react'
 import { useForm } from 'react-hook-form';
 import axios from 'axios'
 import Loader from '.././components/loader.jsx'
import {useDropzone} from 'react-dropzone'
import JSZip from "jszip";
import imageCompression from "browser-image-compression";
import {useUniversal} from '.././context.jsx'
import Editor from '.././components/editor.jsx'
import Preview from '.././components/preview.jsx'
import jsPDF from "jspdf";
import { Packer, Document, Paragraph } from "docx";
import { saveAs } from "file-saver";
// import {FileUpload,FileDownload} from '@mui/icons-material'
 const Root = () => {

 const {saveas,setSaveas,isEditing,setIsEditing}=useUniversal()
 const { register } = useForm();
 const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading,setLoading] = useState(false)
  const [data,setData]= useState(true)
  const [ocrtext,setOcrtext]=useState(' djhfsjged ddjeiwjshfs sjfnizfnksmnvskcv sjbduwskfakjmgvnsd vksnfdiegsf')
  const [refinedtext,setRefinedtext]= useState('xx')
  const [tab,setTab]=useState('scrambled')


  const getRefinedtext=async()=>{
    try{
      setLoading(true)
    }
    catch(err){
      setLoading(false)

    }
  }

  useEffect(()=>{
    if(tab==='refined' && !refinedtext){
      getRefinedtext()
    }
  },[tab])
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



// const onDrop = useCallback(acceptedFiles => {
//     // Do something with the files
//   }, [])
//   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop}) 

 const uploadFile =async(formData)=>{
  try {
      setProgress(0); 
      console.log(formData)
      // const response = await axios.post('/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   onUploadProgress: (progressEvent) => {
      //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //     setProgress(percentCompleted);
      //   },
      // });

      // console.log('Upload successful:', response.data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Upload failed', error);
      alert('File upload failed!');
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


  const handleDownload = (type) => {
    const text = tab === 'scrambled' ? ocrtext: refinedtext
    if (type === "pdf") {
      // PDF generation
      const doc = new jsPDF();
      doc.text(text, 10, 10);
      doc.save("document.pdf");
    } else if (type === "word") {
      // Word generation
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [new Paragraph(text.replace(/<[^>]*>/g, ""))],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "document.docx");
      });
    }
    setSaveas(false)
    setIsEditing(false)
  };
return (
 		<>
{/* 		{
 			isDragging &&
 	<div {...getRootProps()} className={`fixed inset-0 p-5`}>

      <input {...getInputProps()} />
 	 <div className={`border-dashed border-8 border-stone-800 grid place-content-center bg-[rgba(10,10,10,.2)] backdrop-blur-sm h-full`}>
      {
        isDragActive ?
          <p className='font-bold text-3xl '>Drop the files here ...</p>
          :
          <p></p> 
      }
 	 </div>
    </div>
 		}*/}
 		<section className='grid grid-rows-2 gap-4  text-stone-100 border p-3 shadow rounded text-center mt-16'>
	 		<div className=" bg-stone-100 w-full p-5 rounded-lg md:rounded-l-lg flex flex-col">
 			<div className=" text-stone-900 max-w-64 mx-auto flex-grow flex items-center justify-center">
 			{
 				( progress > 0 && progress < 100) ?
 				<Loader open={true} text='Uploading....'/>
 				:
 			<p>
 				Upload a pdf file or series of images in order and let us do the rest
 			</p>
 			}
 			</div>
 			
 			 <form>
		      <label htmlFor="file-upload">Upload Files</label>
		      <input
		        type="file"
		        id="file"
		        multiple
		        hidden
		        {...register('files', {
		          onChange: (e) => handleFileChange(e.target.files),
		        })}
		      />

		      <label htmlFor="file"  className={`block bg-stone-900 p-2 w-full max-w-[30rem] rounded-2xl mx-auto cursor-pointer`}>Upload pdf/image</label>

    		</form>
 			 
	 		</div>
 				<div className=" bg-stone-100 w-full p-5 rounded-lg md:rounded-r-lg md:border-l-2 grid gap-4 relative">

        {
          saveas && 
         <div className="absolute right-0 top-0 grid place-content-center backdrop-blur-sm w-full h-full z-20 bg-[rgba(1,1,1,.2)] rounded"
          onClick={()=>{
            setSaveas(false)
          }}
         >
            <div className="grid bg-stone-100 rounded-xl text-stone-900 gap-3 overflow-auto">

              <p className="font-semibold px-10 py-2">Save file as</p>
              {
                ['pdf','word'].map(item=>{

                return <button onClick={()=>handleDownload(item)} className='capitalize px-5 hover:bg-stone-200 py-2'>{item}</button>
                })
              }
            </div>
         </div>
        }

	 			<div className="flex justify-between ">

        {
          ['scrambled','refined'].map(item=>{
            return (
 				<button className={`${item === tab ? 'bg-stone-900':'bg-stone-400'}  w-32 p-2 rounded-2xl capitalize`}
          onClick={()=>{

            setTab(item)
          }
        }
        >
 					{item}
 				</button>
              )
          })
        }
 			</div>

      {
        tab === 'scrambled'?
          <div className={`text-stone-900 h-[70vh] flex overflow-auto relative`}>
         
        <Loader open={loading} text='Generting text from pdf, please wait....'/>
      {
        ocrtext ? 
          <>
           {
            !isEditing ? 
            <Preview text={ocrtext}/>
            :
          <Editor text={ocrtext}/>
           }
          </>
        :
        <div className="grid place-content-center w-full">
      <p className='max-w-64'>
        Upload a pdf file or series of images in order and let us do the rest
      </p>
          
        </div>
      }
      </div>
      :
      <div className="text-stone-900 h-[70vh] flex overflow-auto relative ">
        
          <Loader open={loading} text='Generating'/>
        {
          !isEditing ?
          <Preview text={refinedtext}/>
          :
          <Editor text={refinedtext}/>
        }
        
      </div>  
      } 
	 		</div>
 		</section>
 		</>
 	)
 }
 
 export default Root


