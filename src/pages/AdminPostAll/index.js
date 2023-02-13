import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLeft from '~/components/NavLeft';
import { UilPostcard } from '@iconscout/react-unicons';
import { UilEstate } from '@iconscout/react-unicons';
import { postServices } from '~/services';
import { useSelector } from 'react-redux';
import { isLoginSelector, userSelector } from '~/redux/selector';
import Post from '~/components/Post';
import classNames from 'classnames/bind';
import styles from './AdminPostAll.module.scss';

const cx = classNames.bind(styles);

const menu = {
    title: 'Volunteer',
    desc: [
        {
            title: 'Trang chủ',
            to: '/',
            icon: UilEstate,
        },
        {
            title: 'Xem bài đăng của tôi',
            to: '/admin/mypost',
            icon: UilPostcard,
        },
    ],
};

function AdminPostAll() {
    const isLogined = useSelector(isLoginSelector);
    const navigate = useNavigate();
    const [post, setPost] = useState([]);

    const getPosts = useCallback(async () => {
        const res = await postServices.getPosts({ limit: 10 });
        if (res.errCode === 0) {
            setPost(res.posts);
        }
    }, []);
    const controlPage = useCallback(() => {
        if (!isLogined) {
            navigate('/login');
        }
    }, [isLogined, navigate]);

    useEffect(() => {
        controlPage();
        getPosts();
    }, [controlPage, getPosts]);

    return (
        <div className={cx('wrap')}>
            <NavLeft menu={menu} />
            <div className={cx('posts')}>
                <div className={cx('post-profice')}>
                    {post.map((post) => {
                        console.log(post);
                        return (
                            <Post
                                light={true}
                                key={post.id}
                                author={post.user.id}
                                title={post.title}
                                content={post.description}
                                upDate={post.createdAt}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={cx('profice')}>
                <div className={cx('info')}>
                    <div className={cx('note')}>
                        <div className={cx('border')}></div>
                        <span>Ghi chú: Bạn đang đăng nhập với tư cách là Admin!</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPostAll;
