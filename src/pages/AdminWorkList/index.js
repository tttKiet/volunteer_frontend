import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoginSelector, userSelector } from '~/redux/selector';
import { useSelector } from 'react-redux';
import { UilEstate } from '@iconscout/react-unicons';
import Loader from '~/components/Loader';
import { UilListUl } from '@iconscout/react-unicons';
import { Container, Row, Col } from 'react-bootstrap';
import ListRequestWork from '~/components/ListRequestWork';
import { workServices } from '~/services';
import NavLeft from '~/components/NavLeft';
import WorkColor from '~/components/WorkColor';
import ListUserWork from '~/components/ListUserWork';

import styles from './AdminWorkList.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const menu = {
    title: 'Quản lý công việc',
    desc: [
        {
            title: 'Trang chủ',
            to: '/',
            icon: UilEstate,
        },
        {
            title: 'Xem danh sách yêu cầu tham gia tình nguyện',
            to: '/admin/view/list-user-req',
            icon: UilListUl,
        },
    ],
};

function AdminWorkList() {
    const navigate = useNavigate();
    const isLogined = useSelector(isLoginSelector);
    const curUser = useSelector(userSelector);
    const [isShowTable, setIsShowTable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [workId, setWorkId] = useState('');
    const [workName, setWorkName] = useState([]);

    const controlPage = useCallback(() => {
        if (!isLogined) {
            navigate('/login');
        }

        if (curUser && curUser.type !== 'admin') {
            navigate('/');
        }
    }, [curUser, isLogined, navigate]);

    const getWork = useCallback(async () => {
        const res = await workServices.getNameWork({});
        if (res.errCode === 0) {
            setWorkName(res.workNames);
        }
    }, []);

    const toggleShowTable = () => {
        setIsShowTable((show) => {
            show ? (document.body.style.overflow = 'auto') : (document.body.style.overflow = 'hidden');
            return !show;
        });
    };

    const handleClickView = async (workId) => {
        setWorkId(workId);
        toggleShowTable();
    };

    useEffect(() => {
        getWork();
        controlPage();
    }, [controlPage, getWork]);

    return (
        <div className={cx('wrap')}>
            <div>
                {isLoading && <Loader />}
                <NavLeft menu={menu} />
                <Container>
                    <Row>
                        <Col md={3}></Col>
                        <Col md={9}>
                            <div className={cx('menu-control')}>
                                <a href="/">Trang chủ</a>/
                                <span href="/admin/view/list-user-req"> Danh sách người tham gia</span>
                            </div>
                            <h2 className={cx('title')}>Vui lòng chọn công việc để xem danh sách tình nguyện viên!</h2>
                            <div className={cx('works', 'row')}>
                                {workName.length === 0 ? (
                                    <h2 className={cx('no-req')}>Chưa có công việc nào!</h2>
                                ) : (
                                    <>
                                        {workName
                                            .filter((name) => name.curStudent > 0)
                                            .map((name) => {
                                                return (
                                                    <WorkColor
                                                        handleClickView={handleClickView}
                                                        key={name.id}
                                                        id={name.id}
                                                        title={name.name}
                                                        time={name.startDate}
                                                        number={name.curStudent}
                                                    />
                                                );
                                            })}
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
                {isShowTable && (
                    <ListUserWork
                        show={isShowTable}
                        workId={workId}
                        toggleShowTable={toggleShowTable}
                        table={workName}
                    />
                )}
            </div>
        </div>
    );
}

export default AdminWorkList;
