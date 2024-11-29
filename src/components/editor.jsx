 import React from 'react'
 import ReactQuill from "react-quill";
 import "react-quill/dist/quill.snow.css";
 import {useUniversal} from '.././context.jsx'


 const Editor = ({text}) => {
 const {saveas,setSaveas}= useUniversal()


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
 	
     return (
         <div className="w-full grid grid-rows-[1fr_40px] gap-3">
          <ReactQuill
            value={text}
            // onChange={setExtractedText}
            theme="snow"
            className="h-full overflow-auto max-w-full"
             modules={modules}
            formats={formats}
            
          />
          <div className="bg-stone-900 rounded-xl text-stone-100 relative grid place-content-center cursor-pointer"
            onClick={()=>{
              setSaveas(true)
            }}
          >
           Save text as
          </div>

         
 		</div>
     )
 }

 export default Editor