import axios from '~/axios';

const workServices = {
    // get work
    async getWork({ workId }) {
        if (workId) {
            const res = await axios.get('/api/v1/work', {
                params: {
                    workId: workId,
                },
            });
            return res.data;
        }
        const res = await axios.get('/api/v1/work');
        return res.data;
    },

    // get name work
    async getNameWork({ type = 'all', workId, userId }) {
        if (type === 'name') {
            const res = await axios.get('/api/v1/work/get-name');
            return res.data;
        }

        if (workId) {
            const res = await axios.get('/api/v1/work/get-all', {
                params: {
                    workId,
                },
            });
            return res.data;
        }

        const res = await axios.get('/api/v1/work/get-all', {
            params: {
                userId,
            },
        });
        return res.data;
    },

    // get name work count resquest
    async getNameWorkAndCountRes() {
        const res = await axios.get('/api/v1/work/get-and-count-resquest');
        return res.data;
    },

    // get name work of  user
    async getNameWorkUser(userId, isChecked) {
        const string = isChecked ? `&&isChecked=1` : '';
        const res = await axios.get(`/api/v1/work-user?userId=${userId}${string}`);
        return res.data;
    },

    // get name work
    async getBrowsedUser({ workId }) {
        const res = await axios.get('/api/v1/work/browsed', {
            params: { id: workId },
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
    async createWork({ name, startDate, workPlace, pointPlus, maxStudent, note }) {
        const res = await axios.post('/api/v1/work/create', {
            name,
            startDate,
            workPlace,
            pointPlus,
            maxStudent,
            note,
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

    async getWorkUserReg({ userId }) {
        const res = await axios.get('/api/v1/work-user-register', {
            params: {
                userId,
            },
        });
        return res.data;
    },
};

export default workServices;
