import React, {useState, useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is installed in your project
import "./upload.css"; // Replace with the correct path to your CSS file
import pdfIcon from "../../assets/images/pdf-icon.svg";
import uploadIcon from '../../assets/images/cloud-computing.png'
import spinner from '../../assets/images/spinner.svg'
import {FileApi} from "../../service/FileApi.ts";
import {useNavigate} from "react-router-dom";
import {FileInputResponse} from "../../models/FileInput.ts";

const PdfUpload: React.FC = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>(null);
  const [validFile, setValidFile] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFileName(`Uploaded File: ${file.name}`);
      setValidFile(true);
    } else {
      setFileName("Please upload a valid PDF file.");
      setValidFile(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setFileName(`Selected File: ${file.name}`);
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    } else {
      setFileName("Please upload a valid PDF file.");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fileInputRef.current?.files?.length) {
      alert("Please select a file before uploading!");
      return;
    }

    console.log('about to upload');
    setIsPending(true);
    const file = fileInputRef.current?.files?.[0];
    const formData = new FormData();
    formData.append("file", file); // The key name should match the API requirement
    const response = await FileApi.handleFileInput(formData);
    if (response.status === 200) {
      navigateToArguments(response)
    } else {
      setFileName("Something went wrong. Please try again.");
      setIsPending(false)
    }
  };

  const navigateToArguments = (response: FileInputResponse) => {
    navigate('/arguments', {
      state: {
        sections: response.sections,
        argumentList: response.arguments,
        relations: response.relations,
        summary: response.summary,
        globalArguments: response.globalArguments,
        globalZones: response.globalZones
      }
    })
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Sci-Arguminer</h1>
      <div
        id="upload-area"
        className={`upload-area ${dragOver ? "dragover" : ""} ${isPending ? "disabled" : ""}`}
        onDragOver={isPending ? undefined : handleDragOver}
        onDragLeave={isPending ? undefined : handleDragLeave}
        onDrop={isPending ? undefined : handleDrop}
        onClick={isPending ? undefined : handleClick}
      >
        <img src={pdfIcon} alt="PDF Icon" />
        <p className="text-sm">Drag and drop your file here</p>
        <p>or</p>
        <button
          className="btn btn-primary"
          type="button"
          onClick={isPending ? undefined : handleClick}
        >
          Choose Files
        </button>
      </div>
      {fileName && <div id="file-name" className={`mt-3 text-center ${validFile ? 'text-success' : 'text-danger'}`}>{fileName}</div>}
      <form onSubmit={isPending ? undefined : handleSubmit}>
        <div className="container mt-5 text-center">
          <button
            type="submit"
            className="bg-gradient btn btn-dark border-opacity-50"
            disabled={isPending}
          >
            <img
              src={uploadIcon}
              className="bg-white"
              alt="Upload Icon"
              width="30"
              height="30"
            />
            <input
              type="file"
              id="fileInput"
              name="pdf_file"
              accept=".pdf"
              hidden
              ref={fileInputRef}
              onChange={isPending ? undefined : handleFileChange}
            />
            <span className="text-md-center m-1">Upload</span>
          </button>
          {/*loader*/}
          <div className="mt-3" hidden={!isPending}>
            <img src={spinner} alt="spinner"/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PdfUpload;
