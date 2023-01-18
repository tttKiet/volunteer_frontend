import axios from '~/axios';

const postService = {
    // Get Post
    async getPosts(id, password) {
        const res = await axios.get('/api/v1/post');
        return res.data;
    },
};

export default postService;
