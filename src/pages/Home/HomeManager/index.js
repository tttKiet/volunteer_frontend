import { useEffect, useState, useCallback } from 'react';
import { Container, Row, Table, Col, Button, Nav } from 'react-bootstrap';

import { workServices } from '~/services';
import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './HomeManager.module.scss';

const cx = classNames.bind(styles);
function HomeManager() {
    const [works, setWorks] = useState([]);
    const handleGetWork = useCallback(async () => {
        const res = await workServices.getWork();
        if (res.errCode === 0) {
            setWorks(res.works);
        }
    }, []);

    const handleClickBrowse = async (id) => {
        const res = await workServices.workBrowse(id);
        if (res.errCode === 0) {
            console.log('ok');
            handleGetWork();
        }
    };

    useEffect(() => {
        handleGetWork();
    }, [handleGetWork]);

    return (
        <Container className={cx('wrap')}>
            <Header />
            <Row className={cx('content')}>
                <Col sm={9}>
                    <Row>
                        <Col sm={12}>
                            <h2 className={cx('title')}>Danh sách sinh viên đăng ký tình nguyện</h2>
                        </Col>
                        <Col md={12}>
                            <div className={cx('table')}>
                                <Table striped bordered hover size="">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên</th>
                                            <th>Nơi thực nghiệm</th>
                                            <th>Sinh viên đăng ký</th>
                                            <th>Tối đa</th>
                                            <th>Số lượng hiện tại</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {works.map((work, id) => {
                                            console.log('work', work);
                                            return (
                                                <tr key={id + 'work'}>
                                                    <td>{id + 1}</td>
                                                    <td>{work.work.name}</td>
                                                    <td>{work.work.workPlace}</td>
                                                    <td>{work.userWork.id}</td>
                                                    <td>{work.work.maxStudent}</td>
                                                    <td>{work.work.curStudent}</td>
                                                    <td>{work.status === 0 ? 'Chưa duyệt' : 'Đã duyệt'}</td>

                                                    <td>
                                                        <Button
                                                            type="button"
                                                            variant="outline-primary"
                                                            className={cx('mx-2', 'custom-btn')}
                                                            onClick={(e) => handleClickBrowse(work.id, e)}
                                                        >
                                                            Duyệt
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="outline-danger"
                                                            className={cx(' mx-2', 'custom-btn')}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
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
            </Row>
        </Container>
    );
}

export default HomeManager;
