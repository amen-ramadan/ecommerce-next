import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = 'https://strapi-ecommerce-demo-2ghr.onrender.com/api';

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`, // تعني نوع ال token يعني قبل ان ابعت ال التوكت اكتب قبلها هذه الكلمة
  }
} );

export default axiosClient;