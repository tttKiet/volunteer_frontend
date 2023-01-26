import axios from '~/axios';

const workServices = {
    // get work
    async getWork() {
        const res = await axios.get('/api/v1/work');
        return res.data;
    },

    // get name work
    async getNameWork() {
        const res = await axios.get('/api/v1/work/get-name');
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
};

export default workServices;
