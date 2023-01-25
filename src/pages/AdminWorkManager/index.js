import { useEffect, useCallback, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { workServices } from '~/services';
import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './AdminWorkManager.scss';

const cx = classNames.bind(styles);

const links = [
    {
        name: 'Trang chủ',
        to: '/',
    },
    {
        name: 'Xem danh sách',
        to: '/admin/view/work',
    },
];

function AdminWorkManager() {
    const [options, setOptions] = useState([]);
    const [list, setList] = useState([]);
    const [optionValue, setOptionValue] = useState({
        name: 'Tất cả',
        value: 'All',
    });

    const handleChangeSeclect = (e) => {
        const index = e.nativeEvent.target.selectedIndex;
        const text = e.nativeEvent.target[index].text;
        setOptionValue({
            name: text,
            value: e.target.value,
        });
    };

    const getListUsers = useCallback(async () => {
        let id;
        if (optionValue.value !== 'All') {
            id = optionValue.value;
        }
        const res = await workServices.getBrowsedUser(id);
        console.log(res);
        if (res.errCode === 0) {
            setList(res.works);
        }
    }, [optionValue.value]);

    const getNameWorks = useCallback(async () => {
        const res = await workServices.getNameWork();
        if (res.errCode === 0) {
            setOptions(res.workNames);
        }
    }, []);

    useEffect(() => {
        getNameWorks();
        getListUsers();
    }, [getListUsers, getNameWorks]);

    return (
        <div className={cx('wrap')}>
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
                                            <td>{row.updatedAt}</td>
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
