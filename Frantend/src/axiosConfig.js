import axios from 'axios';

// تكوين axios لربط API مع backend
const axiosConfig = axios.create({
  baseURL: 'http://localhost:5000/api',  // رابط الـ backend الذي يعمل عليه السيرفر
  headers: {
    'Content-Type': 'application/json',  // تحديد نوع المحتوى
  },
});

export default axiosConfig;
