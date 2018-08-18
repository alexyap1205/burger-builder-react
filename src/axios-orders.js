import axios from 'axios';

const axiosOrders = axios.create({
   baseURL: 'https://react-burger-1205.firebaseio.com/'
});

export default axiosOrders;