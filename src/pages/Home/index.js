import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isLoginSelector } from '~/redux/selector';

import { postServices } from '~/services';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Post from '~/components/Post';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [posts, setposts] = useState([]);
    const dispatch = useDispatch();
    const isLogined = useSelector(isLoginSelector);
    const navigate = useNavigate();

    const handleNavigate = useCallback(() => {
        if (!isLogined) {
            navigate('/login');
        }
    }, [isLogined, navigate]);

    const getPosts = async () => {
        const res = await postServices.getPosts();
        if (res.errCode === 0) {
            setposts(res.posts);
        }
    };

    useEffect(() => {
        handleNavigate();
        getPosts();
    }, [handleNavigate, isLogined]);

    return (
        <div className={cx('wrap')}>
            <Container>
                <Row>
                    <Col md={12}>
                        <Header />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={3}>sadsa</Col>
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
                    <Col md={3}>sadsa</Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Footer />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
