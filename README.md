
# **Claripdf**  
**Transforming Image Based PDFs into Editable and Searchable Documents**  

[![Live Demo](https://img.shields.io/badge/Live%20Demo-claripdf.vercel.app-blue)](https://claripdf.vercel.app)  
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)  

---

## **Table of Contents**
- [Introduction](#introduction)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Notes](#notes)
- [Live Demo](#live-demo)  
- [Future Enhancements](#future-enhancements)  
- [Contributors](#contributors)  
- [License](#license)

---

## **Introduction**  
**Claripdf** is a web-based application designed to convert image-based PDFs or images into editable and searchable documents. By leveraging Optical Character Recognition (OCR) and AI-powered text refinement, Claripdf provides users with a seamless workflow to upload, edit, and export their documents in multiple formats.

---

## **Features**  
- **Upload PDFs and Images**: Accepts image-based PDFs and other document formats.  
- **OCR Conversion**: Uses Tesseract.js to extract text from images.  
- **AI Text Refinement**: Refines OCR-derived text using ChatGPT AI to improve accuracy and formatting.  
- **Rich Text Editing**: Edit the extracted text with a feature-rich text editor.  
- **Export Options**: Download the refined text as a PDF or Word document.  

---

## **Technologies Used**  
### **Frontend:**  
- ReactJs	 
- Tailwind CSS  
- React Quill  for text editing

### **Backend:**  
- Node.js  
- Express 
- Sharp for image preprocessing
- pdf.js and Canvas package for pdf to image conversion
- Tesseract.js (OCR)  
- Ai Model: HuggingFaceH4/starchat2-15b-v0.1 for text refinement

### **Deployment:**  
- Vercel  
- Render

---

## **Installation**  

### 1. Clone the Repository  
 ### **Frontend**
```bash
git clone https://github.com/Dave154/claripdf
cd claripdf
```
 ### **Backend**
```bash
git clone https://github.com/danprecious/ocr-backend
cd claripdf
```

### 2. Install Dependencies  
#### **Frontend:**  
```bash
npm install
```

#### **Backend:** 
```bash 
npm install
```

### 4. Run the Application  
#### **Frontend:**  
```bash
npm run dev
```

#### **Backend:**  
```bash
npm run dev
```

---

## **Usage**  
1. Open the application in your browser at `http://localhost:5173`.  
2. Upload an image-based PDF, an image or a group of images.  
3. Wait for the OCR process to extract the text.  
4. Edit the extracted text using the rich text editor.  
5. Download the edited document in your preferred format (PDF or Word).

---
## **Notes** 
1. Due to the usage of free hosting options, our server is a bit limited and because of the intensive process, the processing of some large pdf files cannot be handled.

---
## **Live Demo**  

[Watch the demo video](./public/demo.gif)

Try Claripdf live: [claripdf.vercel.app](https://claripdf.vercel.app)

---

## **Future Enhancements**  
- **Cloud-Based OCR** for improved accuracy and speed.  
- **Multi-Language Support** to process documents in various languages.  
- **Integration with Cloud Storage** for seamless file uploads and downloads.  
---

## **Contributors**  
- **David Okpe** ([GitHub](https://github.com/Dave154))  
- **Kayode Dan Precious** ([GitHub](https://github.com/danprecious))

---

## **License**  
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### **Contact**  
For inquiries or feedback, please reach out to:  
- **David Okpe**: okpedavid0@gmail.com  
- **Kayode Dan Precious**:	kdpcoder@gmail.com
