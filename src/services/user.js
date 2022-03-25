import api from './api';

const login = async (user) => {
    try {
        return api.post('/user/login', user);
    } catch (error) {
        console.error("login error: ", error);
        return error;
    }
}

const methods = { 
    login
};

export default methods;