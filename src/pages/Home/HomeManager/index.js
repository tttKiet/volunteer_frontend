import { useCallback, useEffect, useState } from 'react';
import { UilBrightnessLow } from '@iconscout/react-unicons';
import { postServices } from '~/services';
import { Container, Row, Col } from 'react-bootstrap';
import Post from '~/components/Post';
import Header from '~/components/Header';
import classNames from 'classnames/bind';
import Footer from '~/components/Footer';
import styles from './HomeManager.module.scss';

const cx = classNames.bind(styles);

const links = [
    { name: 'BÀI ĐĂNG CỦA TÔI', to: '/admin/mypost' },
    { name: 'QUẢN LÝ CÔNG TÁC TÌNH NGUYỆN', to: '/admin/view/list-user-req' },
];
function HomeManager() {
    const [post, setPost] = useState([]);
    const [light, setLight] = useState(true);

    const handleGetPosts = useCallback(async () => {
        const res = await postServices.getPosts({ limit: 1 });
        setPost(res.posts);
    }, []);

    const handleClickIconChange = () => {
        setLight((light) => !light);
    };

    useEffect(() => {
        handleGetPosts();
    }, [handleGetPosts]);

    return (
        <>
            <div className={cx('wrap')}>
                <div className={cx('header')}>
                    
                    <Container>
                        <Header links={links} />
                        <div className={cx('header-main')}>
                            <h2>AI SẼ LÀ NHỮNG TÌNH NGUYỆN VIÊN KẾ TIẾP?</h2>
                            <span>
                                Đây là trang web quản lý dành cho admin, việc lựa chọn thành viên trong lực lượng tình
                                nguyện sẽ do bạn quyết định và giải quyết!
                            </span>
                        </div>
                    </Container>
                </div>
                <div className={cx('main')}>
                    <Container>
                        <Row>
                            <Col sm={12} lg={6} md={12}>
                                <div className={cx('wrap-main')}>
                                    <h2 className={cx('title')}>Truyền thông?</h2>
                                    <p className={cx('paragrap')}>
                                        Để dể dàng hơn trong việc quản bá công việc tình nguyện, các admin có thể đăng
                                        bài viết.
                                    </p>
                                    <h2 className={cx('title')}>“Tại sao không nhiều người biết?”</h2>
                                    <p className={cx('paragrap')}>
                                        Đó đã luôn là trăn trở của tất cả thành viên trong nhóm công tác xã hội ở CTU.
                                        Một phần có thể do hoạt động tình nguyện ở trường không quá sôi nổi và tâm lí sợ
                                        sệt của các bạn sinh viên. Mặt khác, công tác quảng bá, truyền thông của nhóm
                                        cũng còn rất yếu về công tác tình nguyện viên cũng như nguồn tài trợ.
                                    </p>
                                    <h2 className={cx('title')}>
                                        Có nhiều cách để truyền thông công tác tình nguyện, bao gồm:
                                    </h2>
                                    <ul>
                                        <li className={cx('paragrap-list')}>
                                            Sử dụng mạng xã hội: Bạn có thể sử dụng các trang mạng xã hội như Facebook,
                                            Twitter hoặc Instagram để chia sẻ thông tin về công tác tình nguyện của mình
                                            và mời mọi người tham gia.
                                        </li>
                                        <li className={cx('paragrap-list')}>
                                            Tổ chức sự kiện: Bạn có thể tổ chức sự kiện để giới thiệu về công tác tình
                                            nguyện của mình và mời mọi người tham gia.
                                        </li>
                                        <li className={cx('paragrap-list')}>
                                            Sử dụng truyền thông địa phương: Bạn có thể sử dụng các báo địa phương hoặc
                                            truyền hình địa phương để truyền thông về công tác tình nguyện của mình.
                                        </li>
                                        <li className={cx('paragrap-list')}> Sử dụng trang web (như trang này)</li>
                                        <li className={cx('paragrap-list')}>
                                            Gửi thư quảng cáo: : Bạn có thể gửi thư quảng cáo đến các tổ chức hoặc cá
                                            nhân mà bạn muốn mời tham gia công tác tình nguyện của mình.
                                        </li>
                                        <span className={cx('paragrap-list')}> . . .</span>
                                    </ul>
                                </div>
                            </Col>
                            <Col sm={12} lg={6} md={12}>
                                <div
                                    className={cx('wrap-post', {
                                        'wrap-post-light': light,
                                    })}
                                >
                                    {post.map((post) => {
                                        return (
                                            <Post
                                                image={post.linkImage}
                                                light={light}
                                                key={post.id}
                                                author={post.user.id}
                                                title={post.title}
                                                content={post.description}
                                                upDate={post.createdAt}
                                            />
                                        );
                                    })}
                                    <div className={cx('change-wrap')} onClick={handleClickIconChange}>
                                        <UilBrightnessLow
                                            size={28}
                                            className={cx('icon-change', {
                                                'icon-change-light': light,
                                            })}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default HomeManager;
