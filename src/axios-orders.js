import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-1205.firebaseio.com/'
});

export default instance;