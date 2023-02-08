import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '~/components/Header';
import ModalAuth from '~/components/ModalAuth';
import ToastMassage from '~/components/ToastMassage';
import { workServices } from '~/services';
import classNames from 'classnames/bind';
import styles from './AdminWorkCreate.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const links = [
    {
        name: 'Trang chủ',
        to: '/',
    },
    {
        name: 'Xem danh sách sinh viên đăng ký TN',
        to: '/admin/view/list-user-work',
    },
];

function AdminWorkCreate() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowToast, setIsShowToast] = useState(false);
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [point, setPoint] = useState('1');
    const [number, setNumber] = useState('1');
    const [startDate, setStartDate] = useState('');

    const [nameErr, setNameErr] = useState('');
    const [placeErr, setPlaceErr] = useState('');
    const [numberErr, setNumberErr] = useState('');
    const [startDateErr, setStartDateErr] = useState('');

    const handleChangeInput = (e, type) => {
        const value = e.target.value;
        switch (type) {
            case 'name': {
                setName(value);
                break;
            }
            case 'place': {
                setPlace(value);

                break;
            }
            case 'point': {
                if (value <= 0) {
                    setPoint('1');
                    break;
                }
                setPoint(value);
                break;
            }
            case 'number': {
                if (value <= 0) {
                    setNumber('1');
                    break;
                }
                setNumber(value);
                break;
            }
            case 'startDate': {
                setStartDate(value);
                break;
            }
            default: {
                break;
            }
        }
    };

    const setDefaultValue = () => {
        setName('');
        setPlace('');
        setPoint('0');
        setNumber('0');
        setStartDate('');
    };

    const ToggleShowModal = () => {
        setIsShowModal((isShowModal) => !isShowModal);
    };

    const ToggleShowToast = () => {
        setIsShowToast((isShowToast) => !isShowToast);
    };

    const createWork = async () => {
        const res = await workServices.createWork(name, startDate, place, point, number);
        if (res.errCode === 0) {
            setIsShowModal(false);
            setDefaultValue();
            setIsShowToast(true);
        }
    };

    const handleClickCreate = () => {
        let isErr = false;
        if (!name) {
            setNameErr('Bạn chưa điền tên CVTN!');
            isErr = true;
        } else {
            setNameErr('');
        }
        if (!place) {
            setPlaceErr('Bạn chưa điền nơi thực hiện CVTN!');
            isErr = true;
        } else {
            setPlaceErr('');
        }
        if (number <= 0) {
            setNumberErr('Số sinh viên phải lớn hơn 0!');
            isErr = true;
        } else {
            if (point <= 0) {
                setNumberErr('Điểm cộng phải lớn hơn 0!');
                isErr = true;
            } else {
                setNumberErr('');
            }
        }
        if (!startDate) {
            setStartDateErr('Bạn chưa điền ngày thực hiện công việc này!');
            isErr = true;
        } else {
            const currDate = new Date();
            const inputDate = new Date(startDate);
            if (currDate >= inputDate) {
                setStartDateErr('Ngày nhập vào phải lớn hơn ngày hiện tại!');
                isErr = true;
            } else {
                setStartDateErr('');
            }
        }
        if (!isErr) {
            setIsShowModal(true);
        }
    };

    return (
        <div className={cx('wrap')}>
            {isShowToast && (
                <ToastMassage
                    header="Thông báo"
                    handleClose={ToggleShowToast}
                    isShow={isShowToast}
                    content="Tạo thành công."
                />
            )}
            <Container>
                <Header links={links} />

                <Row className={cx('content')}>
                    <Col sm={5}>
                        <h4 className={cx('title')}> Tạo công việc tình nguyện </h4>
                    </Col>

                    <Col sm={7}></Col>
                    <hr />

                    <Col md={7}>
                        <div className={cx('form')}>
                            <form className="row g-3">
                                <div className="g-3 row align-items-center">
                                    <div className="col-3">
                                        <label htmlFor="name" className="col-form-label">
                                            Tên công việc:
                                        </label>
                                    </div>
                                    <div className="col-9">
                                        <input
                                            onChange={(e) => handleChangeInput(e, 'name')}
                                            type="text"
                                            value={name}
                                            id="name"
                                            placeholder="VD: Hiến máu"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-auto offset-3">
                                        <span id="nameHelpInline" className="form-text">
                                            {nameErr}
                                        </span>
                                    </div>
                                </div>
                                <div className="g-3 row align-items-center">
                                    <div className="col-3">
                                        <label htmlFor="place" className="col-form-label">
                                            Nơi làm việc:
                                        </label>
                                    </div>
                                    <div className="col-9">
                                        <input
                                            onChange={(e) => handleChangeInput(e, 'place')}
                                            type="text"
                                            value={place}
                                            placeholder="Nhập nơi diển ra công việc này"
                                            id="place"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-auto offset-3">
                                        <span id="placeHelpInline" className="form-text">
                                            {placeErr}
                                        </span>
                                    </div>
                                </div>

                                <div className="g-3 row  align-items-center">
                                    <div className="col-3">
                                        <label htmlFor="number" className="col-form-label">
                                            Tối đa sinh viên:
                                        </label>
                                    </div>
                                    <div className="col-3">
                                        <input
                                            onChange={(e) => handleChangeInput(e, 'number')}
                                            value={number}
                                            type="number"
                                            id="number"
                                            placeholder="Số lượng sinh viên tối đa"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="col-3">
                                        <label htmlFor="point" className="col-form-label">
                                            Điểm cộng:
                                        </label>
                                    </div>
                                    <div className="col-3">
                                        <input
                                            onChange={(e) => handleChangeInput(e, 'point')}
                                            type="number"
                                            value={point}
                                            id="point"
                                            placeholder="Cộng DRL cho SV tham gia"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-auto offset-3">
                                        <span className="form-text">{numberErr}</span>
                                    </div>
                                </div>

                                <div className="g-3 row align-items-center">
                                    <div className="col-3">
                                        <label htmlFor="date" className="col-form-label">
                                            Ngày làm việc:
                                        </label>
                                    </div>
                                    <div className="col-4">
                                        <input
                                            onChange={(e) => handleChangeInput(e, 'startDate')}
                                            type="date"
                                            value={startDate}
                                            id="date"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <span className="form-text">{startDateErr}</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button
                                        type="button"
                                        size="lg"
                                        className={cx('btn', 'btn-primary', 'btn-lg', 'mx-4')}
                                        onClick={handleClickCreate}
                                    >
                                        Tạo
                                    </Button>
                                    {isShowModal && (
                                        <ModalAuth
                                            isShowModal={isShowModal}
                                            header={'Bạn có chắc muốn tạo công việc này?'}
                                            main={
                                                'Lưu ý: Việc này sẽ tạo ra công việc cho các sinh viên đăng ký thực hiện.'
                                            }
                                            ToggleShowModal={ToggleShowModal}
                                            uploadPost={createWork}
                                        />
                                    )}

                                    <Button
                                        type="reset"
                                        size="lg"
                                        className={cx('btn', 'btn-danger', 'btn-lg')}
                                        onClick={setDefaultValue}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AdminWorkCreate;
