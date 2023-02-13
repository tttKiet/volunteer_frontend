import { Row, Col, Button } from 'react-bootstrap';
import ToastMassage from '../ToastMassage';
import ModalAuth from '../ModalAuth';
import { UilCheck } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import { UilLabelAlt } from '@iconscout/react-unicons';
import styles from './ListRequestWork.module.scss';
import RowTableUserReq from '../RowTableUserReq/RowTableUserReq';
import { UilAngleDoubleLeft } from '@iconscout/react-unicons';
import { workServices } from '~/services';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
const cx = classNames.bind(styles);

function ListRequestWork({
    show,
    toggleShowTable,
    name,
    startDate,
    workPlace,
    maxStudent,
    curStudent,
    arrayRow,
    getWorkReq,
    getNameWorkAndCountRes,
}) {
    const [row, setRow] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [reqUser, setReqUser] = useState({
        id: '',
        workId: '',
    });
    const [currStudentNumber, setCurrStudentNumber] = useState();
    const [toastOb, setToastOb] = useState({
        show: false,
        header: '',
        content: '',
    });

    const toggleShowModal = (id, workId) => {
        if (id && workId) {
            setReqUser({
                id,
                workId,
            });
        }
        setIsShowModal((view) => !view);
    };

    const toggleShowToast = ({ header, show, content }) => {
        setToastOb((toastOb) => {
            return {
                header: header ? header : '',
                content: content ? content : '',
                show: show ? show : !toastOb.show,
            };
        });
    };

    const handleRender = async (id) => {
        const res = await getWorkReq(id);
        getWork(id);
        setRow(res);
    };

    const handleDeleteRow = async () => {
        const res = await workServices.handleDeleteWorkRegister(reqUser.id);
        if (res.errCode === 0) {
            toggleShowModal();
            setToastOb((toastOb) => {
                return {
                    header: 'Xong',
                    content: 'Xóa thành công',
                    show: !toastOb.show,
                };
            });
            handleRender(reqUser.workId);
            getNameWorkAndCountRes();
        }
    };

    const getWork = async (workId) => {
        const res = await workServices.getNameWork({ workId });
        setCurrStudentNumber(res.workNames[0].curStudent);
    };

    useEffect(() => {
        setRow(arrayRow);
        setCurrStudentNumber(curStudent);
    }, [arrayRow, curStudent]);

    return (
        <div
            className={cx('wrap', {
                show: show,
            })}
        >
            <div title="Quay lại" className={cx('icon-back')} onClick={toggleShowTable}>
                <UilAngleDoubleLeft size={28} />
            </div>
            <div className={cx('wrap-table')}>
                <h2 className={cx('title')}>{name}</h2>
                <div className={cx('control')}>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Ngày bắt đầu:</span>
                        <span className={cx('more-number')}>
                            <Moment local="vi" format="ll">
                                {startDate}
                            </Moment>
                        </span>
                    </div>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Nơi làm việc:</span>
                        <span className={cx('more-number')}> {workPlace}</span>
                    </div>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Tối đa: </span>
                        <span className={cx('more-number')}> {maxStudent}</span>
                    </div>

                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Hiện tại: </span>
                        <span className={cx('more-number')}> {currStudentNumber}</span>
                    </div>
                </div>
                <div className={cx('note')}>
                    Ghi chú:
                    <ul className={cx('note-list')}>
                        <li className={cx('note-item')}>
                            <UilLabelAlt size={12} className={cx('list-tyle')} />
                            Nhấn vào
                            <Button size="sm" className={cx('btn')} variant="outline-primary">
                                <UilCheck size={18} />
                            </Button>
                            để duyệt sinh viên vào danh sách tham gia.
                        </li>
                        <li className={cx('note-item')}>
                            <UilLabelAlt size={12} className={cx('list-tyle')} />
                            Nhấn vào
                            <Button size="sm" className={cx('btn')} variant="outline-danger">
                                <UilTimes size={18} />
                            </Button>
                            để xóa sinh viên ra khỏi danh sách đăng ký tham gia.
                        </li>
                    </ul>
                </div>

                <div className={cx('table')}>
                    <Row>
                        <Col md={12}>
                            {row.length > 0 ? (
                                <>
                                    <Row>
                                        <Col md={1} className={cx('header')}>
                                            STT
                                        </Col>
                                        <Col md={2} className={cx('header')}>
                                            Mã số sinh viên
                                        </Col>
                                        <Col md={2} className={cx('header')}>
                                            Tên
                                        </Col>
                                        <Col md={3} className={cx('header')}>
                                            Email
                                        </Col>
                                        <Col md={1} className={cx('header')}>
                                            Lớp
                                        </Col>
                                        <Col md={2} className={cx('header')}>
                                            Hành động
                                        </Col>
                                    </Row>

                                    {row.map((row, i) => {
                                        return (
                                            <RowTableUserReq
                                                toggleShowModal={toggleShowModal}
                                                toggleShowToast={toggleShowToast}
                                                handleRender={handleRender}
                                                getNameWorkAndCountRes={getNameWorkAndCountRes}
                                                id={row.id}
                                                workId={row.work.id}
                                                stt={i + 1}
                                                mssv={row.userWork.id}
                                                name={row.userWork.name}
                                                email={row.userWork.email}
                                                className={row.userWork.className}
                                                key={i}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <div className={cx('done')}>Các yêu cầu đã được xử lý! </div>
                            )}
                        </Col>
                    </Row>
                    <ToastMassage
                        isShow={toastOb.show}
                        header={toastOb.header}
                        content={toastOb.content}
                        handleClose={() => toggleShowToast({})}
                    />
                    <ModalAuth
                        header="Bạn có chắc muốn xóa?"
                        main="Hành động này sẽ xóa bản ghi trong cơ sở dữ liệu và không thể khôi phục"
                        isShowModal={isShowModal}
                        handleOk={handleDeleteRow}
                        ToggleShowModal={toggleShowModal}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListRequestWork;
