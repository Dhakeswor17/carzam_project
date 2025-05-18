import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import '../styles/DragAndDropComp.css';
import { useNavigate } from 'react-router-dom';






function DragAndDrop() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

    const handleDragOver = (event) => event.preventDefault();

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];

        if (droppedFile) {
            setFile(droppedFile);
            sendToLLM(droppedFile);
        }
    }
    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            if (!allowedTypes.includes(selectedFile.type)) {
                alert("Invalid file type! Please upload an image (PNG, JPG, JPEG, GIF).");
                return;
            }

            setFile(selectedFile);
            setImageUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSend = async() => {
        navigate('/loading');

        // Create a FormData object to package the file for upload
        const formData = new FormData();
        formData.append('image', file);
    
        try {
            // Send a POST request to your backend's upload endpoint
            const response = await fetch('http://localhost:5000/upload', {
              method: 'POST',
              body: formData,
            });
    
            
            const result = await response.json();
            console.log('Response from backend:', result);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
    }

    
    

    return (
        <div
            className='col flex-column  align-items-center d-flex justify-content-center mb-3 '
            onDrag={handleDragOver}
            onDrop={handleDrop}>
            <div className='dragContainer d-flex justify-content-center  align-items-center'>

                {file ? (
                    <div>
                        {imageUrl && (
                            <div className='col d-flex flex-column align-items-center me-4'>
                                <img src={imageUrl} />
                                <div className='col gap-3 d-flex image_info justify-content-center'>
                                    <p className=''>{"Licence plate: 123-ABC"}</p>
                                    {console.log(file.size)}
                                </div>
                            </div>)
                        }
                        {console.log(file)}
                    </div>
                ) : (
                    <p className="textDrag">Drag & Drop a file here</p>

                )}
            </div>


            <div className='mt-4 gap-3 d-flex justify-content-center'>
                {file ?
                    (<label className="custom-file-label" onClick={handleSend}> 
                        {file ? "send" : " Upload "}
                    </label>) : null
                }

                <input
                    type="file"
                    className="form-control custom-file-input d-none"
                    id="customFile"
                    onChange={handleFileSelect}
                    accept='.jpg, .jpeg, .png'
                />
                <label className="custom-file-label" htmlFor="customFile" >
                    {file ? "Upload new plate" : " Upload "}
                </label>
            </div>
        </div>

    )
}

export default DragAndDrop