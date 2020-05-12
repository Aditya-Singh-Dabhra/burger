import axios from 'axios';


const instance = axios.create({
    baseURL:'https://my-burger-builder-8ef48.firebaseio.com/'
});


export default instance;