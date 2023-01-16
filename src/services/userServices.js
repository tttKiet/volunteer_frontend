import axios from '~/axios';

const userService = {
    // login
    async login(user, password) {
        const res = await axios.post('/api/v1/login', {
            user: user,
            password: password,
        });
        return res.data;
    },
};

export default userService;
