import axios from 'axios';

const api = axios.create({
    baseURL:'http://127.0.0.1:5000',
    headers:{
        'Content-Type': 'multipart/form-data'
    }
})

export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try{
        const response = await api.post('/analyze-color',formData);
        return response.data;
    }catch (error){
        console.log(error);
        throw error;
    }
}
