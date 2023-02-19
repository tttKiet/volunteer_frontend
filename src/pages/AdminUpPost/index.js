import { Container, Row, Col, Nav, Form, Button } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoginSelector, userSelector } from '~/redux/selector';

import postService from '~/services/postServices';
import ModalAuth from '~/components/ModalAuth';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Loader from '~/components/Loader';

import classNames from 'classnames/bind';
import styles from './AdminUpPost.module.scss';

const cx = classNames.bind(styles);
function AdminUpPost() {
    const isLogined = useSelector(isLoginSelector);
    const curUser = useSelector(userSelector);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [isShowModal, setIsShowModal] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [err, setErr] = useState('');

    const handleChangeInputTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeInputTextarea = (e) => {
        setDesc(e.target.value);
    };

    const uploadPost = async () => {
        if (!title || !desc) {
            return setErr('Bạn chưa điền đủ thông tin!');
        }

        setIsLoad(true);
        const id = setTimeout(async () => {
            const res = await postService.upPost(curUser.id, title, desc);
            clearTimeout(id);
            setIsLoad(false);
            if (res.errCode === 0) {
                setErr('');
                navigate('/admin/mypost');
            }
        }, 1000);
    };

    const ToggleShowModal = () => {
        setIsShowModal((isShowModal) => !isShowModal);
    };

    const goToBack = () => {
        navigate('/admin/mypost');
    };

    const controlPage = useCallback(() => {
        if (!isLogined) {
            navigate('/login');
        } else if (curUser.type !== 'admin') {
            navigate('/invalid/404');
        }
    }, [curUser.type, isLogined, navigate]);

    useEffect(() => {
        controlPage();
    }, [controlPage]);
    return (
        <div className={cx('wrap')}>
            {isLoad && <Loader />}
            <Container>
                <div className={cx('container-post')}>
                    <Header />
                    <Row className={cx('content-post')}>
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
                                        <Nav.Link href="/admin/view/list-user-work"> Quản lý công việc </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className={cx('border-link')}>
                                        <Nav.Link href="" disabled>
                                            Updating...
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </Col>
                        <Col sm={9}>
                            <Row>
                                <Col sm={12}>
                                    <h2 className={cx('title')}>Đăng thông báo</h2>
                                </Col>
                                <Col md={12}>
                                    <div className={cx('wrap-form', 'd-flex', 'justify-content-center')}>
                                        <Form className={cx('form')}>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="floatingInput"
                                                    value={title}
                                                    placeholder="Tiêu đề"
                                                    onChange={handleChangeInputTitle}
                                                ></input>
                                                <label htmlFor="floatingInput">Tiêu đề</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <textarea
                                                    type="text"
                                                    rows={9}
                                                    style={{ minHeight: '200px' }}
                                                    placeholder="content"
                                                    className={cx('form-control', 'textarea')}
                                                    id="Nội dung"
                                                    onChange={handleChangeInputTextarea}
                                                    value={desc}
                                                ></textarea>
                                                <label htmlFor="floatingTextarea2">Nội dung</label>
                                            </div>

                                            <div> {err}</div>
                                            <div className={cx('submit-btn')}>
                                                <ModalAuth
                                                    isShowModal={isShowModal}
                                                    ToggleShowModal={ToggleShowModal}
                                                    uploadPost={uploadPost}
                                                    header="Đồng ý đăng bài"
                                                    main="Lưu ý: bài đăng sẽ hiển thị cho tất cả các thành viên khác"
                                                />

                                                <Button variant="primary" onClick={ToggleShowModal}>
                                                    Đăng
                                                </Button>
                                                <Button variant="danger" className="mx-3" onClick={goToBack}>
                                                    Hủy
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Footer />
                </div>
            </Container>
        </div>
    );
}

export default AdminUpPost;
