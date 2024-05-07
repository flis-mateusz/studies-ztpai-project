import { useState } from 'react';

function AnnouncementForm() {
    const [files, setFiles] = useState([]);
    const [announcementDetail, setAnnouncementDetail] = useState({
        name: '',
        locality: '',
        price: 5,
        description: '',
        age: 0,
        gender: '',
        avatarUrl: '',
        kind: '',
        ageType: '',
        announcementAnimalFeatures: [
            {
                isPositive: true,
                feature: '/api/animal_features/1'
            }
        ]
    });

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAnnouncementDetail(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        //formData.append('animalType', '/api/animal_types/2'); // Na sztywno

        // Dodajemy szczegóły ogłoszenia jako JSON string w jednym z pól formularza
        // formData.append('announcementDetail', JSON.stringify(announcementDetail));

        // Dodajemy pliki
        for (let i=0; i<files.length; i++) {
            formData.append('files[]', files[i]);
            // formData.append('uploads[][/api/media_objects/11]', files[i]);
        }

        try {
            const response = await fetch('http://localhost:8082/api/announcements/5/uploads', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTUwMzY5MjYsImV4cCI6MTcxNTY0MTcyNiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJlbWFpbCI6Im9Aby5vIn0.fB11UIvdmq3-H0nlKEjrTCPtPzAK134wnENJOzOsMTIcNI36ZhlDbN6GCsp4m8gOg60Z8f-9Fy98nzs4jG9uu5dKaqraXExZ2jtYN9QIEzS5UiadjFt_FbVdee2CXxjAjS5DToqI9vqzY6o-pE79s6b7oPMld6a14mOtJF0ziO_di7PFCsIpCine8fgBkQLkkwwXOC6heJ9ffckzNIizEUSHs4mVI0B52CLE2o4oIVl-wkeB9VzLps8TZpGoLciDJN9HJTMMNAz5Kqy1NIv1BNPxEC6uW42jwt9E_mEOH8N2tgrbErxh4h6xXX4aNW8IbUK-mJOJgjEWPzwzx9G0sg'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={announcementDetail.name} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="locality">Locality:</label>
                <input type="text" id="locality" name="locality" value={announcementDetail.locality} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={announcementDetail.price} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={announcementDetail.description} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" value={announcementDetail.age} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <input type="text" id="gender" name="gender" value={announcementDetail.gender} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="avatarUrl">Avatar URL:</label>
                <input type="text" id="avatarUrl" name="avatarUrl" value={announcementDetail.avatarUrl} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="kind">Kind:</label>
                <input type="text" id="kind" name="kind" value={announcementDetail.kind} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="ageType">Age Type:</label>
                <input type="text" id="ageType" name="ageType" value={announcementDetail.ageType} onChange={handleChange} />
            </div>
            <div>
                <label>Upload Files:</label>
                <input type="file" multiple onChange={handleFileChange} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default AnnouncementForm;
