import { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Post from '~/components/Post';
import ModalRegisterWork from '~/components/ModalRegisterWork';
import { postServices } from '~/services';

import classNames from 'classnames/bind';
import styles from './HomeUser.module.scss';

const cx = classNames.bind(styles);

function HomeUser() {
    const [posts, setposts] = useState([]);
    const getPosts = async () => {
        const res = await postServices.getPosts();
        if (res.errCode === 0) {
            setposts(res.posts);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);
    return (
        <Container>
            <Header />
            <Row className={cx('content')}>
                <Col md={3}>
                    <Nav className={cx('flex-column', 'nav')} activeKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/">Frefress Page!</Nav.Link>
                        </Nav.Item>
                        <div className="nav-item">
                            <span className="nav-link">Đăng ký tình nguyện</span>
                            <ModalRegisterWork />
                        </div>
                        <Nav.Item>
                            <Nav.Link href="/lists-work"> Danh mục Work </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="" disabled>
                                Updating...
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col md={6}>
                    <h2 className={cx('noticatons')}>Thong Bao</h2>
                    <div className={cx('posts')}>
                        {posts.map((post, i) => (
                            <Post
                                key={i + 'post'}
                                title={post.title}
                                author={post.user.name}
                                content={post.description}
                                upDate={post.createdAt}
                            />
                        ))}
                    </div>
                </Col>
                <Col md={3}>Lịch Tham gia tình nguyện của bạn </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Footer />
                </Col>
            </Row>
        </Container>
    );
}

export default HomeUser;
