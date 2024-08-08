import React, { useState } from 'react'
import { app, db } from './Fireconfig';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from 'firebase/firestore';


export const Model = () => {
  
    const[file,setFile]=useState(null);
    // const [downloadURL, setDownloadURL] = useState("");
    // const [uploading, setUploading] = useState(false);
    const [image,setImage]=useState(null);
    const handlesubmit=(e)=>{
        setFile(e.target.files[0]);
        
    }
    const handleFileupload=()=>{
      console.log(file);
      const formData =new FormData();
      formData.append('file',file)
      const storage = getStorage();
      const storageRef = ref(storage, file.name);


      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(storageRef).then((url) => {
          setImage(url);
         
        });
      }).catch((error)=>{
        console.log(error);
      });
    }

  return (
    <div className="main">
      <div className="flex items-center justify-center p-6 bg-teal-200">
        <input
          type="file"
          onChange={handlesubmit}
          placeholder="upload the file"
        />
        <button
          className="bg-emerald-400 h-7 flex justify-center w-100 border-solid rounded-lg"
          onClick={handleFileupload}
        >
          Choose the file
        </button>
      </div>
      <img src={image} />
    </div>
  );
}
