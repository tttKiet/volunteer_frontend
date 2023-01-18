import axios from '~/axios';

const postService = {
    // Get Post
    async getPosts(id) {
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
            const res = await axios.get('/api/v1/post');
            return res.data;
        } catch (e) {
            console.log('loi');
        }
    },
};

export default postService;
