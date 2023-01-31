import Button from 'react-bootstrap/Button';
import { Form, Col } from 'react-bootstrap';
import { workServices } from '~/services';
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';
import classNames from 'classnames/bind';
import styles from './ModalRegisterWork.module.scss';
import { useCallback, useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function ModalRegisterWork({ isShow, toggleIsShow, handleRegisterWork }) {
    const [message, setMessage] = useState('Vui lòng chọn công việc mà bạn muốn làm tình nguyện!');
    const [nameWorks, setNameWorks] = useState([]);
    const [curSelect, setCurSelect] = useState();

    const getNameWorks = useCallback(async () => {
        const res = await workServices.getNameWork();
        if (res.errCode === 0) {
            setNameWorks(res.workNames);
        }
    }, []);

    const findWork = (id) => {
        return nameWorks.find((item) => item.id === id);
    };

    const handleChangeSelect = (e) => {
        const select = findWork(e.target.value);
        setCurSelect(select);
    };

    const handleClickRegister = async () => {
        if (curSelect) {
            const errCode = await handleRegisterWork(curSelect.id);
            if (errCode === 0) {
                setCurSelect(undefined);
                toggleIsShow();
                setMessage('Vui lòng chọn công việc mà bạn muốn làm tình nguyện!');
            }
        } else if (!curSelect) {
            setMessage('Vui lòng chọn công việc phù hợp!!!');
        }
    };

    useEffect(() => {
        getNameWorks();
    }, [getNameWorks]);

    return (
        <div>
            <Modal className={cx('wrap')} show={isShow} onHide={toggleIsShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng ký làm tình nguyện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <p className="my-3">
                                <b>Đây là danh sách các công việc được tạo</b>{' '}
                            </p>
                            <select
                                value={curSelect ? curSelect.id : 'chon'}
                                onChange={handleChangeSelect}
                                className="form-select form-select-lg mb-3"
                            >
                                <option value="chon">--Chọn--</option>

                                {nameWorks.map((work) => {
                                    return (
                                        <option key={work.id} value={work.id}>
                                            {work.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </Form.Group>

                        {!curSelect ? (
                            <div>
                                <span className="p-2">{message}</span>
                            </div>
                        ) : (
                            <>
                                <Form.Group className="mb-3">
                                    <Col sm={12}>
                                        <span className={cx('date-title')}>Ngày thực hiện:</span>
                                        <Moment local="vi">{curSelect.startDate}</Moment>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Col sm={12}>
                                        <span className={cx('date-title')}>Nơi làm việc:</span>
                                        <span> {curSelect.workPlace}</span>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Col sm={7}>
                                        <span className={cx('date-title')}>Số lượng sinh viên đăng ký tối đa:</span>
                                        <span>{curSelect.maxStudent}</span>
                                    </Col>
                                    <Col sm={5}>
                                        <span className={cx('date-title')}>Số lượng hiện tại: </span>
                                        <span>{curSelect.curStudent}</span>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Col sm={12}>
                                        <span className={cx('date-title')}>Quyền lợi:</span>
                                        <span>
                                            Sau khi thực hiện xong công việc, bạn sẽ được cộng
                                            <span> {curSelect.pointPlus} </span>
                                            điểm rèn luyện vào học kỳ này
                                        </span>
                                    </Col>
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="lg" variant="secondary" onClick={toggleIsShow}>
                        Đóng
                    </Button>
                    <Button size="lg" variant="primary" onClick={handleClickRegister}>
                        Đăng ký
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalRegisterWork;
