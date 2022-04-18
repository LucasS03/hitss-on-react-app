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

const saveUser = async (user) => {
	try {
		return api.post('/user', user);
	} catch (error) {
		console.error("save user error: ", error);
		return error;
	}
}

const updateUser = async (id, user) => {
	try {
		return api.put(`/user/${id}`, user);
	} catch (error) {
		console.error("update user error: ", error);
		return error;
	}
}

const deleteUserById = async (id) => {
	try {
		return api.delete(`/user/${id}`);
	} catch (error) {
		console.error("delete user error: ", error);
		return error;
	}
}

const methods = { 
    login,
    getUsers,
    saveUser,
    updateUser,
    deleteUserById
};

export default methods;