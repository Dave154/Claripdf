 import { useState, useCallback, useEffect } from 'react'
 import { useUniversal } from '.././context.jsx'
 import Loader from '.././components/loader.jsx'
 import Editor from '.././components/editor.jsx'
import Preview from '.././components/preview.jsx'
import {Link,useNavigate} from'react-router-dom'
import jsPDF from "jspdf";
import { Packer, Document, Paragraph } from "docx";
import { saveAs } from "file-saver";
import { FaArrowLeft,FaFilePdf } from "react-icons/fa";
import { FaRegFileWord } from "react-icons/fa6";

 const Generated = () => {
     const navigate =useNavigate()
     const { saveas, setSaveas, isEditing, setIsEditing, ocrtext ,refinedtext,setCurrentRoute,sideWidth} = useUniversal()
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
   	// if(!ocrtext){
   	// 	alert('')
   	// 	navigate('/')
   	// }
   	setCurrentRoute('Generated')
   },[])
     // useEffect(() => {
     //     if (tab === 'refined' && !refinedtext) {
     //         getRefinedtext()
     //     }
     // }, [tab])

     // const getRefinedtext = async () => {
     //     try {
     //         setLoading(true)
     //     } catch (err) {
     //         setLoading(false)

     //     }
     // }

   const handleDownload = (type) => {
    const text = tab === 'scrambled' ? ocrtext: refinedtext
    if (type === "pdf") {
      // PDF generation
      const doc = new jsPDF();
      doc.text(text, 10, 10);
      doc.save("claripdf_document.pdf");
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
        saveAs(blob, "claripdf_document.docx");
      });
    }
    setSaveas(false)
    setIsEditing(false)
  };

     return (
     	<section className={`grid place-items-center h-screen text-stone-100 relative pt-16 transition-all duration-700`}
     		style={{
       			 marginLeft: window.innerWidth >= 768 ? `${sideWidth}px` : '0px',
      			}}
     	>
         <div className="  w-full p-5 rounded-lg md:rounded-r-lg  grid gap-4 relative">
           {/*<Link to='/'>
           	
     		<i className="absolute top-0 left-2 text-stone-900">
     			<FaArrowLeft/>
     		</i>
           </Link>*/}

        {
          saveas && 
         <div className="fixed right-0 top-0 grid place-content-center backdrop-blur-sm w-full h-full z-40 bg-[rgba(1,1,1,.2)] rounded"
          onClick={()=>{
            setSaveas(false)
          }}
         >
            <div className="grid bg-stone-100 rounded-xl text-stone-900 gap-3 overflow-auto">

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
      <p className='max-w-64 text-center'>
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
     )
 }

 export default Generated