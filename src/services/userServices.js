import axios from '~/axios';

const userService = {
    // login
    async login(id, password) {
        const res = await axios.post('/api/v1/login', {
            id: id,
            password: password,
        });
        return res.data;
    },
};

export default userService;
