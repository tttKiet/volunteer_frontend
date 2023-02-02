import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';
import { Container, Row, Col, Nav } from 'react-bootstrap';

import { postServices, workServices } from '~/services';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Post from '~/components/Post';
import WorkCalendar from '~/components/WorkCalendar';
import Loader from '~/components/Loader';
import ModalRegisterWork from '~/components/ModalRegisterWork';
import ToastMassage from '~/components/ToastMassage';

import classNames from 'classnames/bind';
import styles from './HomeUser.module.scss';

const cx = classNames.bind(styles);

function HomeUser() {
    const currUser = useSelector(userSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [obToast, setObToast] = useState({
        isShow: false,
        header: '',
        content: '',
    });
    const [isShowModalRegister, setIsShowModalRegister] = useState(false);
    const [posts, setposts] = useState([]);
    const getPosts = async () => {
        const res = await postServices.getPosts();
        if (res.errCode === 0) {
            setposts(res.posts);
        }
    };
    const toggleIsShow = () => {
        setIsShowModalRegister((show) => !show);
    };

    const toggleIsShowToast = () => {
        setObToast({
            isShow: !obToast.isShow,
            header: '',
            content: '',
        });
    };

    const handleRegisterWork = async (workId) => {
        setIsLoading(true);
        const userId = currUser.id;
        const res = await workServices.registerWork(userId, workId);
        setObToast({
            isShow: true,
            header: res.errCode === 0 ? 'Thành công (Vui lòng đợi admin xét duyệt)' : 'Thất bại',
            content: res.errMessage,
        });
        setIsLoading(false);
        return res.errCode;
    };

    useEffect(() => {
        getPosts();
    }, []);
    return (
        <Container>
            {isLoading && <Loader />}
            <ToastMassage
                header={obToast.header}
                content={obToast.content}
                isShow={obToast.isShow}
                handleClose={toggleIsShowToast}
            />

            <Header />
            <Row className={cx('content')}>
                <Col md={3}>
                    <div className={cx('control')}>
                        <Nav className={cx('flex-column', 'nav')} activeKey="/home">
                            <Nav.Item className={cx('border-link')}>
                                <Nav.Link href="/">Frefress Page!</Nav.Link>
                            </Nav.Item>
                            <div className={cx('border-link', 'nav-item')}>
                                <span className="nav-link" onClick={toggleIsShow}>
                                    Đăng ký tình nguyện
                                </span>
                                <ModalRegisterWork
                                    isShow={isShowModalRegister}
                                    toggleIsShow={toggleIsShow}
                                    handleRegisterWork={handleRegisterWork}
                                />
                            </div>
                            <Nav.Item className={cx('border-link')}>
                                <Nav.Link href="/lists-work"> Danh mục Work </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={cx('border-link')}>
                                <Nav.Link href="" disabled>
                                    Updating...
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </Col>
                <Col md={6}>
                    <h2 className={cx('notications')}>Thông báo</h2>
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
                <Col md={3}>
                    <WorkCalendar />
                </Col>
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
