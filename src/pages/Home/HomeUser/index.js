import { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Post from '~/components/Post';
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
            <Row>
                <Col md={12}>
                    <Header />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={3}>
                    <Nav className={cx('flex-column', 'nav')} activeKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/">Frefress Page!</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/user/add-work">Đăng ký tình nguyện</Nav.Link>
                        </Nav.Item>
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
                                author={post.user.name}
                                content={post.descrtiption}
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
