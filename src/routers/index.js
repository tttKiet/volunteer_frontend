import Home from '~/pages/Home';
import Login from '~/pages/Login';
import AdminPost from '~/pages/AdminPost';
import AdminUpPost from '~/pages/AdminUpPost';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/admin/mypost',
        component: AdminPost,
    },
    {
        path: '/admin/up-post',
        component: AdminUpPost,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
