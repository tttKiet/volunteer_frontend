import Button from 'react-bootstrap/Button';
import { Form, Col } from 'react-bootstrap';
import { workServices } from '~/services';
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';
import classNames from 'classnames/bind';
import styles from './ModalRegisterWork.module.scss';
import { useCallback, useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function ModalRegisterWork(props) {
    const [nameWorks, setNameWorks] = useState([]);
    const [curSelect, setCurSelect] = useState({});

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
        console.log(curSelect);
        setCurSelect(select);
    };

    useEffect(() => {
        getNameWorks();
    }, [getNameWorks]);

    return (
        <div>
            <Modal className={cx('wrap')} show={true} onHide={() => {}}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng ký làm tình nguyện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
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

                        <Form.Group className="mb-3">
                            <Col sm={12}>
                                <span className={cx('date-title')}>Ngay bat dau:</span>
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
                                <span className={cx('date-title')}>
                                    Số lượng sinh viên đăng ký tối đa: {curSelect.maxStudent}
                                </span>
                            </Col>
                            <Col sm={5}>
                                <span className={cx('date-title')}>Số lượng hiện tại: {curSelect.curStudent}</span>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3 row">
                            <Col sm={12}>
                                <span className={cx('date-title')}>
                                    Quyền lợi: Sau khi thực hiện xong công việc, bạn sẽ được cộng {curSelect.pointPlus}
                                    điểm rèn luyện vào học kỳ này
                                </span>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Đóng</Button>
                    <Button variant="primary">Đăng ký</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalRegisterWork;
