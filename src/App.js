import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url).toString();

function App() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  // const [allFiles, setAllFiles] = useState(null)
  // const [numPages, setNumPages] = useState(null);
//change for file 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  //
  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:1000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  // small change
  const getFileType = (file) => {
    const extension = file.split(".").pop().toLowerCase();
    if (["pdf"].includes(extension)) {
      return "pdf";
    } else if (["png", "jpg", "jpeg", "gif"].includes(extension)) {
      return "image";
    } else {
      return "document";
    }
  };

  const renderPdf = (file) => {
    // Replace this with your PDF rendering logic
    console.log("Render PDF:", file);
  };

  const renderImage = (file) => {
    // Replace this with your image rendering logic
    console.log("Render image:", file);
  };

  const renderDocument = (file) => {
    // Replace this with your document rendering logic
    console.log("Render document:", file);
  };


  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:1000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };
  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:1000/files/${pdf}`)
  };

// change
// const getAllFiles = async () => {
//   const result = await axios.get("http://localhost:1000/get-files");
//   console.log(result.data.data);
//   setAllFiles(result.data.data);
// };
// const handleDelete = async (id) => {
//   try {
//     const result = await axios.delete(`http://localhost:1000/delete-file/${id}`);
//     console.log(result);
//     if (result.data.status === "ok") {
//       alert("File deleted successfully!");
//       getAllFiles(); // Refresh the list of files after deletion
//     }
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     // Handle the error, e.g., show an error message to the user
//   }
// };
// function onDocumentLoadSuccess({ numPages }) {
//   setNumPages(numPages);
// }
// <Document file="path/to/pdf/file.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//   {Array.from(new Array(numPages), (el, index) => (
//     <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//   ))}
// </Document>


//till change


  return (
    <div className="App">
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload a Pdf </h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          class="form-control"
          // accept="application/pdf" -- main
          accept=".pdf, .png, .jpg, .jpeg, .xls, .xlsx"//change
          onChange={handleFileChange} //change
           required
          // onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
<button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
<div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className="inner-div">
                    <h6>Title: {data.title}</h6>
                     <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button> 
                    {/* <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(data._id)}
                    >
                      Delete
                    </button> */}

                    
        </div>
                );
              })}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile}/>
    </div>
  );
}

export default App;


