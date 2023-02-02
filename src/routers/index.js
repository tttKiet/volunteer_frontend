import Home from '~/pages/Home';
import Login from '~/pages/Login';
import AdminPost from '~/pages/AdminPost';
import AdminUpPost from '~/pages/AdminUpPost';
import AdminWorkManager from '~/pages/AdminWorkManager';
import AdminWorkCreate from '~/pages/AdminWorkCreate';
import UserDetailsWork from '~/pages/UserDetailsWork';
import Invalid_404 from '~/pages/Invalid_404';

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
    {
        path: '/admin/work/create',
        component: AdminWorkCreate,
    },
    {
        path: '/user/details-work',
        component: UserDetailsWork,
    },
    {
        path: '/invalid/404',
        component: Invalid_404,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
