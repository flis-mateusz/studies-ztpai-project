import {useState} from "react";
import axios from "axios";

function Test() {
    const [file, setFile] = useState(null);

    const handleFileChange = event => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/test', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully');
        } catch (error) {
            alert('Error uploading file');
            console.error('Upload error:', error);
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload File</button>
            </form>
        </div>
    );
}

export default Test;