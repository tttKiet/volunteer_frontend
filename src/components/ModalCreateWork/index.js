import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { workServices } from '~/services';
import style from './ModalCreateWork.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
function ModalCreateWork({ isShow, handleClose, handleOk }) {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [number, setNumber] = useState('');
    const [plus, setplus] = useState('');
    const [time, setTime] = useState('');
    const [note, setNote] = useState('');

    const [nameErr, setNameErr] = useState('');
    const [placeErr, setPlaceErr] = useState('');
    const [numberErr, setNumberErr] = useState('');
    const [plusErr, setplusErr] = useState('');
    const [timeErr, setTimeErr] = useState('');

    const [obToast, setObToast] = useState({
        header: '',
        content: '',
        isShow: false,
    });

    const changeInput = (e, type) => {
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
            case 'number': {
                setNumber(value);
                break;
            }
            case 'plus': {
                setplus(value);
                break;
            }
            case 'time': {
                setTime(value);
                break;
            }
            case 'note': {
                setNote(value);
                break;
            }

            // eslint-disable-next-line no-fallthrough
            default: {
                break;
            }
        }
    };

    const setDefaultValue = (type) => {
        if (type === 'er') {
            setNameErr('');
            setPlaceErr('');
            setNumberErr('');
            setplusErr('');
            setTimeErr('');
        } else {
            setName('');
            setPlace('');
            setNumber('');
            setplus('');
            setTime('');
            setNote('');
        }
    };

    const toggleShowToast = ({ header, content, show }) => {
        setObToast((toast) => {
            return {
                header: header ? header : '',
                content: content ? content : '',
                isShow: show ? show : !toast.isShow,
            };
        });
    };

    const createWork = async () => {
        const res = await workServices.createWork({
            name,
            startDate: time,
            workPlace: place,
            pointPlus: plus,
            maxStudent: number,
            note,
        });

        if (res.errCode === 0) {
            toggleShowToast({ header: 'Xong', content: 'Đã tạo công việc', isShow: true });
            handleClose();
            setDefaultValue();
        }
    };

    const checkErr = (type) => {
        switch (type) {
            case 'name': {
                console.log('---------checkerr', nameErr);
                return nameErr.length > 0;
            }
            case 'place': {
                return placeErr.length > 0;
            }
            case 'number': {
                return numberErr.length > 0;
            }
            case 'plus': {
                return plusErr.length > 0;
            }
            case 'time': {
                return timeErr.length > 0;
            }

            default: {
                break;
            }
        }
    };

    const validate = () => {
        let err = true;
        if (!name) {
            setNameErr('Bạn phải điền tên công việc');
            err = false;
        } else {
            setNameErr('');
        }

        if (!place) {
            setPlaceErr('Nơi diễn ra công việc không được để trống!');
            err = false;
        } else {
            setPlaceErr('');
        }

        if (!number) {
            setNumberErr('Bạn chưa nhập số sinh viên tối đa tham gia!');
            err = false;
        } else {
            setNumberErr('');
        }

        if (!plus) {
            setplusErr('Bạn phải điền số điểm cộng!');
            err = false;
        } else if (plus >= 10) {
            setplusErr('Điểm cộng < 10!');
            err = false;
        } else {
            setplusErr('');
        }

        if (!time) {
            setTimeErr('Bạn phải điền ngày làm việc!');
            err = false;
        } else if (new Date(time) <= new Date()) {
            setTimeErr('Phải là ngày trong tương lai!');
            err = false;
        } else {
            setTimeErr('');
        }

        if (err) setDefaultValue('er');
        return err;
    };

    const handleCLickSuccess = () => {
        if (validate()) {
            createWork();
        }
    };

    return (
        <>
            <ToastMassage
                isShow={obToast.isShow}
                header={obToast.header}
                content={obToast.content}
                handleClose={() => toggleShowToast({})}
            />
            <Modal
                show={isShow}
                onHide={() => {
                    setDefaultValue('er');
                    handleClose();
                }}
            >
                <div
                    className={cx('table-err', {
                        show: nameErr || placeErr || numberErr || plusErr || timeErr,
                    })}
                >
                    <h2>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faBug} />
                        </div>
                        <span> Vui lòng kiểm tra dữ liệu đã nhập:</span>
                    </h2>
                    <div className={cx('wrap-err')}>
                        <ul>
                            {nameErr && (
                                <li>
                                    <label htmlFor="name">
                                        <FontAwesomeIcon icon={faCircleExclamation} />
                                        {nameErr}
                                    </label>
                                </li>
                            )}
                            {placeErr && (
                                <li>
                                    <label htmlFor="place">
                                        <FontAwesomeIcon icon={faCircleExclamation} />
                                        {placeErr}
                                    </label>
                                </li>
                            )}
                            {numberErr && (
                                <li>
                                    <label htmlFor="number">
                                        <FontAwesomeIcon icon={faCircleExclamation} />
                                        {numberErr}
                                    </label>
                                </li>
                            )}
                            {plusErr && (
                                <li>
                                    <label htmlFor="plus">
                                        <FontAwesomeIcon icon={faCircleExclamation} />
                                        {plusErr}
                                    </label>
                                </li>
                            )}
                            {timeErr && (
                                <li>
                                    <label htmlFor="time">
                                        <FontAwesomeIcon icon={faCircleExclamation} />
                                        {timeErr}
                                    </label>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <Modal.Header closeButton>
                    <h5 className={cx('modal-title')}>Tạo Công việc mới</h5>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div>
                            <div
                                className={cx('form__group', 'field', {
                                    err: checkErr('name'),
                                })}
                            >
                                <input
                                    required=""
                                    placeholder="Name"
                                    id="name"
                                    className={cx('form__field')}
                                    autoComplete="off"
                                    type="input"
                                    value={name}
                                    onChange={(e) => changeInput(e, 'name')}
                                ></input>
                                <label className={cx('form__label')} htmlFor="name">
                                    <span>*</span> Tên công việc:
                                </label>
                            </div>
                        </div>
                        <div>
                            <div
                                className={cx('form__group', 'field', {
                                    err: checkErr('place'),
                                })}
                            >
                                <input
                                    required=""
                                    onChange={(e) => changeInput(e, 'place')}
                                    placeholder="Nơi làm việc"
                                    id="place"
                                    className={cx('form__field')}
                                    autoComplete="off"
                                    type="input"
                                    value={place}
                                ></input>
                                <label className={cx('form__label')} htmlFor="place">
                                    <span>*</span> Nơi làm việc:
                                </label>
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('col-md-6')}>
                                <div
                                    className={cx('form__group', 'field', {
                                        err: checkErr('number'),
                                    })}
                                >
                                    <input
                                        required=""
                                        onChange={(e) => changeInput(e, 'number')}
                                        value={number}
                                        name="number"
                                        placeholder="number"
                                        id="number"
                                        className={cx('form__field')}
                                        type="number"
                                    ></input>
                                    <label className={cx('form__label')} htmlFor="number">
                                        <span>*</span> Tối đa sinh viên:
                                    </label>
                                </div>
                            </div>
                            <div className={cx('col-md-6')}>
                                <div
                                    className={cx('form__group', 'field', {
                                        err: checkErr('plus'),
                                    })}
                                >
                                    <input
                                        onChange={(e) => changeInput(e, 'plus')}
                                        required=""
                                        name="plus"
                                        min="1"
                                        placeholder="plus"
                                        value={plus}
                                        id="plus"
                                        className={cx('form__field')}
                                        type="number"
                                    ></input>
                                    <label className={cx('form__label')} htmlFor="plus">
                                        <span>*</span> Điểm cộng:
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className={cx('form__group', 'field', {
                                    err: checkErr('time'),
                                })}
                            >
                                <input
                                    onChange={(e) => changeInput(e, 'time')}
                                    id="time"
                                    className={cx('form__field')}
                                    type="datetime-local"
                                    value={time}
                                    autoComplete="off"
                                ></input>
                                <label className={cx('form__label')} htmlFor="time">
                                    <span>*</span> Ngày làm việc:
                                </label>
                            </div>
                        </div>

                        <div>
                            <div className={cx('form__group', 'field')}>
                                <textarea
                                    onChange={(e) => changeInput(e, 'note')}
                                    id="note"
                                    defaultValue={note}
                                    className={cx('form__field', 'note')}
                                    autoComplete="off"
                                ></textarea>
                                <label className={cx('form__label')} htmlFor="time">
                                    Ghi chú (không bắt buộc):
                                </label>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setDefaultValue('er');
                            handleClose();
                        }}
                    >
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleCLickSuccess}>
                        Tạo
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateWork;
