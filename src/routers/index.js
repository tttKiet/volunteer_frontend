import Home from '~/pages/Home';
import Login from '~/pages/Login';
import AdminPost from '~/pages/AdminPost';
import AdminUpPost from '~/pages/AdminUpPost';
import AdminWorkManager from '~/pages/AdminWorkManager';

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
    {
        path: '/admin/view/list-user-work',
        component: AdminWorkManager,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
