import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'https://react-burger-1205.firebaseio.com/'
});

export default axiosInstance;