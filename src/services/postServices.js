import axios from '~/axios';

const postService = {
    // Get Post
    async getPosts({ id, limit }) {
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
                params: { limit },
            });
            return res.data;
        } catch (e) {
            console.log('loi');
        }
    },

    // Up load post
    async upPost(id, title, description, image) {
        console.log('file', image);

        const formData = new FormData();
        try {
            const data = {
                userId: id,
                title,
                description,
                image,
            };

            for (const key in data) {
                formData.append(key, data[key]);
            }

            const res = await axios.post('/api/v1/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (e) {
            console.log('e----------------', e);
        }
    },

    // Statistical
    async getStatisticalPost({ userId }) {
        const res = await axios.get('/api/v1/statistical/post', {
            params: {
                userId,
            },
        });
        return res.data;
    },

    // Delete post
    async deletePostByid({ id }) {
        const res = await axios.delete('/api/v1/post/delete', {
            params: {
                id,
            },
        });
        return res.data;
    },
};

export default postService;
