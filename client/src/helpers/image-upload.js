import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/eventsmanager/upload';
const CLOUDINARY_UPLOAD_PRESET = 'uq5d6tkk';


const handleImageUpload = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  return axios.post(CLOUDINARY_URL, formData)
    .then(response => response.data.secure_url)
    .catch(error => error.response);
};

export default handleImageUpload;
