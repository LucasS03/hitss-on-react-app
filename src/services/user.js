import api from './api';

const login = async (user) => {
    try {
        return api.post('/user/login', user);
    } catch (error) {
        console.error("login error: ", error);
        return error;
    }
}


const getUsers = async () => {
    try {
        const resp = await api.get('/users');

        return resp.data;
    } catch (error) {
        console.error("get users error", error);
        return error;
    }
}

const methods = { 
    login,
    getUsers
};

export default methods;