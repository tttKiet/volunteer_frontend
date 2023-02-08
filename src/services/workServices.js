import axios from '~/axios';

const workServices = {
    // get work
    async getWork() {
        const res = await axios.get('/api/v1/work');
        return res.data;
    },

    // get name work
    async getNameWork(type = 'all') {
        if (type === 'name') {
            const res = await axios.get('/api/v1/work/get-name');
            return res.data;
        }

        const res = await axios.get('/api/v1/work/get-all');
        return res.data;
    },

    // get name work of  user
    async getNameWorkUser(userId, isChecked) {
        const string = isChecked ? `&&isChecked=1` : '';
        const res = await axios.get(`/api/v1/work-user?userId=${userId}${string}`);
        return res.data;
    },

    // get name work
    async getBrowsedUser(id) {
        const res = await axios.get('/api/v1/work/browsed', {
            params: { id: id },
        });
        return res.data;
    },

    // browse work
    async workBrowse(id) {
        const res = await axios.patch('/api/v1/work-browse', {
            id,
        });
        return res.data;
    },

    // create work
    async createWork(name, startDate, workPlace, pointPlus, maxStudent) {
        const res = await axios.post('/api/v1/work/create', {
            name,
            startDate,
            workPlace,
            pointPlus,
            maxStudent,
        });
        return res.data;
    },

    // register work
    async registerWork(userId, workId) {
        const res = await axios.post('/api/v1/work/register', {
            userId,
            workId,
        });
        return res.data;
    },

    async handleDeleteWorkRegister(id) {
        const res = await axios.delete('/api/v1/listUser/delete', {
            data: {
                id,
            },
        });
        return res.data;
    },
};

export default workServices;
