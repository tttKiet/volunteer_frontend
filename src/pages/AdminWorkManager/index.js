import { useEffect, useCallback, useState } from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import { isLoginSelector, userSelector } from '~/redux/selector';
import { useSelector } from 'react-redux';

import Header from '~/components/Header';
import Loader from '~/components/Loader';
import { Container, Row, Col } from 'react-bootstrap';
import { workServices } from '~/services';
import classNames from 'classnames/bind';
import styles from './AdminWorkManager.module.scss';

const cx = classNames.bind(styles);

const links = [
    {
        name: 'Trang chủ',
        to: '/',
    },
    {
        name: 'Tạo công việc mới',
        to: '/admin/work/create',
    },
];

function AdminWorkManager() {
    const navigate = useNavigate();
    const isLogined = useSelector(isLoginSelector);
    const curUser = useSelector(userSelector);

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [list, setList] = useState([]);
    const [optionValue, setOptionValue] = useState({
        name: 'Tất cả',
        value: 'All',
    });

    const controlPage = useCallback(() => {
        if (!isLogined) {
            navigate('/login');
        }

        if (curUser && curUser.type !== 'admin') {
            navigate('/');
        }
    }, [curUser, isLogined, navigate]);

    const handleChangeSeclect = (e) => {
        const index = e.nativeEvent.target.selectedIndex;
        const text = e.nativeEvent.target[index].text;
        setOptionValue({
            name: text,
            value: e.target.value,
        });
    };

    const getListUsers = useCallback(async () => {
        setIsLoading(true);
        let id;
        if (optionValue.value !== 'All') {
            id = optionValue.value;
        }
        const res = await workServices.getBrowsedUser(id);
        if (res.errCode === 0) {
            setList(res.works);
        }
        setIsLoading(false);
    }, [optionValue.value]);

    const getNameWorks = useCallback(async () => {
        const res = await workServices.getNameWork('name');
        if (res.errCode === 0) {
            setOptions(res.workNames);
        }
    }, []);

    useEffect(() => {
        controlPage();
        getNameWorks();
        getListUsers();
    }, [controlPage, getListUsers, getNameWorks]);

    return (
        <div className={cx('wrap')}>
            {isLoading && <Loader />}
            <Container>
                <Header links={links} />

                <Row className={cx('content')}>
                    <Col sm={5}>
                        <h4 className={cx('title')}> Danh sách sinh viên đăng ký tình nguyện</h4>
                    </Col>
                    <Col className={cx('title')} sm={3}>
                        <select
                            className={cx('form-select', 'select')}
                            onChange={handleChangeSeclect}
                            value={optionValue.value}
                        >
                            <option defaultValue={'All'}>All</option>
                            {options.map((op, i) => (
                                <option key={i + 'option'} value={op.id}>
                                    {op.name}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <hr />
                    <Col md={12}>
                        <div className={cx('table')}>
                            <h4 className={cx('name-work')}>Danh sách: {optionValue.name}</h4>
                            <table className={cx('table table-striped table-hover', 'table-form')}>
                                <thead>
                                    <tr>
                                        <th scope="col">#STT</th>
                                        <th scope="col">MSSV</th>
                                        <th scope="col">Họ và tên</th>
                                        <th scope="col">Email </th>
                                        <th scope="col">Đẵ đăng ký ngày </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((row, i) => (
                                        <tr key={i + 'row'}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{row.userWork.id}</td>
                                            <td>{row.userWork.name}</td>
                                            <td>{row.userWork.email}</td>
                                            <td>
                                                <Moment local="vi">{row.updatedAt}</Moment>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AdminWorkManager;
