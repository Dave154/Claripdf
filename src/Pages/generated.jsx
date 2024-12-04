import { useState, useCallback, useEffect } from 'react'
import { useUniversal } from '.././context.jsx'
import Loader from '.././components/loader.jsx'
import Editor from '.././components/editor.jsx'
import Preview from '.././components/preview.jsx'
import {Link,useNavigate} from'react-router-dom'
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";
import { FaArrowLeft,FaFilePdf } from "react-icons/fa";
import { FaRegFileWord } from "react-icons/fa6";
import Upload from '.././components/upload.jsx'
 const Generated = () => {
     const navigate =useNavigate()
     const {windowWidth, saveas, setSaveas, isEditing, setIsEditing, ocrtext ,refinedtext,setCurrentRoute,sideWidth} = useUniversal()
     const [loading, setLoading] = useState(false)
     const [tab, setTab] = useState('scrambled')


     const saveMethodList= [
     {
     	method:'pdf',
     	icon:<FaFilePdf/>
     },
     {
     	method:'word',
     	icon:<FaRegFileWord/>
     },
     	]
   useEffect(()=>{
   	setCurrentRoute('Generated')
   },[])

   const handleDownload = (type) => {
    const text = tab === 'scrambled' ? ocrtext: refinedtext
    if (type === "pdf") {
      // PDF generation
     const editor = document.createElement("div");
     editor.innerHTML = text
       const options = {
      margin: 10,
      filename: "claripdf_document.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(editor).set(options).save();
    } else if (type === "word") {
      // Word generation
    const parser = new DOMParser();
    const parsed = parser.parseFromString(text, "text/html");
    const paragraphs = Array.from(parsed.body.children);

      const doc = new Document({
       sections: [
        {
          children: paragraphs.map((p) => {
            const textContent = p.textContent || "";
            const bold = p.querySelector("strong, b") !== null;
            const italic = p.querySelector("em, i") !== null;

            return new Paragraph({
              children: [
                new TextRun({
                  text: textContent,
                  bold: bold,
                  italics: italic,
                }),
              ],
            });
          }),
        },
      ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "claripdf_document.docx");
      });
    }
    setSaveas(false)
    setIsEditing(false)
  };

     return (
     	<section className={`grid place-items-center h-screen text-stone-100 relative pt-12 transition-all duration-700`}
     		style={{
       			 marginLeft:windowWidth>= 768 ? `${sideWidth}px` : '0px',
      			}}
     	>
         <div className=" h-full w-full p-5 rounded-lg md:rounded-r-lg  flex flex-col gap-4 relative">
        {
          saveas && 
         <div className="fixed right-0 top-0 grid place-content-center backdrop-blur-sm w-full h-full z-40 bg-[rgba(1,1,1,.2)] rounded"
          onClick={()=>{
            setSaveas(false)
          }}
         >
            <div className="flex flex-col bg-stone-100 rounded-xl text-stone-900 gap-10 overflow-auto">

              <p className="font-semibold px-10 py-2">Save file as</p>
              {
                saveMethodList.map(item=>{

                return <button key={item.method} onClick={()=>handleDownload(item.method)} className='capitalize px-5 hover:bg-stone-200 py-2 flex  items-center'>
                	<i className="basis-[10%] text-xl">
                		{item.icon}
                	</i>
                	<p className="basis-[90%]">
                		{item.method}
                	</p>
                </button>
                })
              }
            </div>
         </div>
        }

	 	<div className="flex justify-between gap-3 ">

        {
          ['scrambled','refined'].map(item=>{
            return (
 				<button key={item} className={`${item === tab ? 'bg-stone-900':'bg-stone-400'}  w-28 text-sm p-2 rounded-2xl capitalize`}
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
      	 (ocrtext || refinedtext) ? 

       <div className={`text-stone-900 h-[70vh] flex overflow-auto relative flex-1`}>
         
        <Loader open={loading} text='Generting text from pdf, please wait....'/>
      
       
          <>
           {
            !isEditing ? 
            <Preview text={tab==='scrambled'? ocrtext: refinedtext}/>
            :
          <Editor text={tab==='scrambled'? ocrtext: refinedtext} where={tab}/>
           }
          </>
      
      </div>
        :
        <div className="flex-1">
      	<Upload/>
        </div>
      }
	 		</div>
     	</section>
     )
 }

 export default Generated