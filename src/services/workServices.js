import axios from '~/axios';

const workServices = {
    // get work
    async getWork(id, password) {
        const res = await axios.get('/api/v1/work');
        return res.data;
    },

    // Browse work
    async workBrowse(id) {
        const res = await axios.patch('/api/v1/work-browse', {
            id,
        });
        return res.data;
    },
};

export default workServices;
