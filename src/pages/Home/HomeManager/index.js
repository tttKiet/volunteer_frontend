import { useEffect, useState, useCallback } from 'react';
import { Container, Row, Table, Col, Button, Nav } from 'react-bootstrap';

import ToastMassage from '~/components/ToastMassage';
import ModalAuth from '~/components/ModalAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { workServices } from '~/services';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import classNames from 'classnames/bind';
import styles from './HomeManager.module.scss';

const cx = classNames.bind(styles);
function HomeManager() {
    const [isShowToast, setIsShowToast] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [contentToast, setContentToast] = useState({
        header: '',
        content: '',
    });
    const [deleteId, setDeleteId] = useState('');

    const [works, setWorks] = useState([]);
    const handleGetWork = useCallback(async () => {
        const res = await workServices.getWork();
        if (res.errCode === 0) {
            setWorks(res.works);
        }
    }, []);

    const ToggleShowToast = () => {
        setIsShowToast((cur) => !cur);
    };

    const ToggleShowModal = () => {
        setIsShowModal((cur) => !cur);
    };

    const handleClickBrowse = async (id) => {
        const res = await workServices.workBrowse(id);
        if (res.errCode === 0) {
            handleGetWork();
        }
    };
    const handleCLickX = async (id) => {
        setDeleteId(id);
        setIsShowModal(true);
    };

    const handleDeleteRow = async ({ id }) => {
        const res = await workServices.handleDeleteWorkRegister(id);
        if (res.errCode === 0) {
            setIsShowModal(false);
            handleGetWork();
            setContentToast({
                header: 'Thành công',
                content: res.errMessage,
            });
            ToggleShowToast();
        }
    };

    useEffect(() => {
        handleGetWork();
    }, [handleGetWork]);

    return (
        <>
            <Container className={cx('wrap')}>
                <ToastMassage
                    isShow={isShowToast}
                    header={contentToast.header}
                    content={contentToast.content}
                    handleClose={ToggleShowToast}
                />
                <ModalAuth
                    isShowModal={isShowModal}
                    header="Bạn có chắc muốn xóa"
                    main='Việc nhấn "Đồng ý", bạn sẽ xóa dữ liệu này trong database và không thể khôi phục lại!'
                    ToggleShowModal={ToggleShowModal}
                    uploadPost={handleDeleteRow}
                    deleteId={deleteId}
                />
                <Header />
                <Row className={cx('content')}>
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
                                <h2 className={cx('title')}>Danh sách sinh viên đăng ký tình nguyện</h2>
                            </Col>
                            <Col md={12}>
                                <div className={cx('table')}>
                                    {works.length > 0 ? (
                                        <Table striped bordered hover size="">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span className={cx('header-table')}>#STT</span>
                                                    </th>
                                                    <th>
                                                        <span className={cx('header-table')}>Tên</span>
                                                    </th>
                                                    <th>
                                                        <span className={cx('header-table')}>Nơi làm việc</span>
                                                    </th>
                                                    <th>
                                                        <span className={cx('header-table')}>Sinh viên</span>
                                                    </th>
                                                    <th>
                                                        <span className={cx('header-table')}>Tối đa</span>
                                                    </th>
                                                    <th>
                                                        <span className={cx('header-table')}>Hiện tại</span>
                                                    </th>
                                                    <th>
                                                        <span className={cx('header-table')}>Trạng thái</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {works.map((work, id) => {
                                                    return (
                                                        <tr key={id + 'work'}>
                                                            <td>
                                                                <div className={cx('wrap-td')}>{id + 1}</div>
                                                            </td>
                                                            <td>
                                                                <div className={cx('wrap-td')}>{work.work.name}</div>
                                                            </td>
                                                            <td>
                                                                <div className={cx('wrap-td')}>
                                                                    {work.work.workPlace}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className={cx('wrap-td')}>{work.userWork.id}</div>
                                                            </td>
                                                            <td>
                                                                <div className={cx('wrap-td')}>
                                                                    {work.work.maxStudent}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className={cx('wrap-td')}>
                                                                    {work.work.curStudent}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className={cx('wrap-td')}>
                                                                    {work.status === '0' ? 'Chưa duyệt' : 'Đã duyệt'}
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline-primary"
                                                                    className={cx('mx-2', 'my-2', 'custom-btn')}
                                                                    onClick={(e) => handleClickBrowse(work.id, e)}
                                                                >
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline-danger"
                                                                    className={cx(' mx-2', 'custom-btn')}
                                                                    onClick={() => handleCLickX(work.id)}
                                                                >
                                                                    <FontAwesomeIcon icon={faXmark} />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        <h2 className={cx('non-res')}>Chưa có sinh viên nào đăng ký </h2>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default HomeManager;
