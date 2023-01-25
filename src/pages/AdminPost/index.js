import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postServices } from '~/services';
import { useSelector } from 'react-redux';
import { isLoginSelector, userSelector } from '~/redux/selector';
import Post from '~/components/Post';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import classNames from 'classnames/bind';
import styles from './AdminPost.module.scss';

const cx = classNames.bind(styles);
function AdminPost() {
    const isLogined = useSelector(isLoginSelector);
    const curUser = useSelector(userSelector);
    const navigate = useNavigate();
    const [post, setPost] = useState([]);

    const getPosts = useCallback(async () => {
        const res = await postServices.getPosts(curUser.id);
        if (res.errCode === 0) {
            setPost(res.posts);
        }
    }, [curUser.id]);
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
            <Container>
                <div className={cx('container-post')}>
                    <Header />
                    <Row className={cx('content-post')}>
                        <Col sm={9}>
                            <Row>
                                <Col sm={12}>
                                    <h2 className={cx('title')}> BÀI ĐĂNG của bạn</h2>
                                </Col>
                                <Col md={12}>
                                    <div className={cx('table', 'posts')}>
                                        {post.map((post, id) => (
                                            <Post
                                                author={'Bạn - ' + post.user.id}
                                                title={post.title}
                                                key={id + 'post'}
                                                content={post.description}
                                                upDate={post.createdAt}
                                            />
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3}>
                            <div className={cx('control-admin')}>
                                <Nav className={cx('flex-column', 'nav')} activeKey="/home">
                                    <Nav.Item className={cx('border-link')}>
                                        <Nav.Link href="/">Frefress Page!</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className={cx('border-link')}>
                                        <Nav.Link href="/admin/mypost">Bài đăng của tôi</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className={cx('border-link')}>
                                        <Nav.Link href="/admin/up-post"> Đăng bài</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className={cx('border-link')}>
                                        <Nav.Link href="/admin/work"> Quản lý công việc </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className={cx('border-link')}>
                                        <Nav.Link href="" disabled>
                                            Updating...
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </Col>
                    </Row>
                    <Footer />
                </div>
            </Container>
        </div>
    );
}

export default AdminPost;
