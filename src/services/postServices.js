import axios from '~/axios';

const postService = {
    // Get Post
    async getPosts({ id, litmit }) {
        if (id) {
            try {
                const res = await axios.get('/api/v1/post', {
                    params: { id },
                });

                return res.data;
            } catch (e) {
                console.log('loi');
            }
        }
        try {
            const res = await axios.get('/api/v1/get-all-post', {
                params: { litmit },
            });
            return res.data;
        } catch (e) {
            console.log('loi');
        }
    },

    // Up load post
    async upPost(id, title, description) {
        try {
            const res = await axios.post('/api/v1/post', {
                userId: id,
                title,
                description,
            });
            return res.data;
        } catch (e) {
            console.log('loi');
        }
        console.log(id, title, description);
    },
};

export default postService;
