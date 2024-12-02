 import React from 'react'
 import ReactQuill from "react-quill";
 import "react-quill/dist/quill.snow.css";
 import {useUniversal} from '.././context.jsx'
 import {FaDownload} from 'react-icons/fa'


 const Editor = ({text,where}) => {
 const {saveas,setSaveas,ocrtext,setOcrtext,refinedtext, setRefinedtext,saveToIndexedDB,setIsEditing}= useUniversal()


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"], // Remove formatting button
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "color",
  "background",
  "align",
  "link",
  "image",
];
 	    const setExtractedText=(e)=>{
          if(where=== 'scrambled'){
            console.log(e)
            setOcrtext(e)
          }else {
            setRefinedtext(e)
          }
      }

     return (
         <div className="w-full grid grid-rows-[1fr_40px] gap-3">
          <ReactQuill
            value={text}
             onChange={setExtractedText}
            theme="snow"
            className="h-full overflow-auto max-w-full"
             modules={modules}
            formats={formats}
            
          />
          <div className='flex gap-3'>


            <button className="bg-stone-500 rounded-xl text-stone-100 relative grid place-content-center cursor-pointer w-full"
            onClick={()=>{
                 saveToIndexedDB('db', 'claridb', { Ocr:ocrtext, refined:refinedtext });
                 setIsEditing(false)
              
            }}
          >
           Save 
          </button>

           <button className="bg-stone-900 rounded-xl text-stone-100 relative grid place-content-center cursor-pointer w-10 h-10"
            onClick={()=>{
              setSaveas(true)
            }}
          > 

           <FaDownload/>
          </button>
          </div>

         
 		</div>
     )
 }

 export default Editor