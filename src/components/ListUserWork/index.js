import { Row, Col, Button } from 'react-bootstrap';
import ToastMassage from '../ToastMassage';
import * as XLSX from 'xlsx/xlsx.mjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './ListUserWork.module.scss';
import { UilAngleDoubleLeft } from '@iconscout/react-unicons';
import { workServices } from '~/services';
import { useCallback, useEffect, useState } from 'react';
import Moment from 'react-moment';
import RowTableWork from '../RowTableWork';
const cx = classNames.bind(styles);

function ListUserWork({ show, workId, toggleShowTable, name, startDate, workPlace, maxStudent, curStudent }) {
    const [row, setRow] = useState([]);
    const [data, setData] = useState([]);

    const getBrowsedUser = useCallback(async () => {
        const res = await workServices.getBrowsedUser({ workId });
        if (res.errCode === 0) {
            setRow(res.works);
            setData(res.works);
        }
    }, [workId]);

    const handleClickExportFile = () => {
        const ws = XLSX.utils.json_to_sheet(data, {
            header: ['STT', 'Họ và tên', 'MSSV', 'Email', 'Lớp', 'Ngày đăng ký'],
            skipHeader: false,
            origin: 'A3',
        });

        XLSX.utils.sheet_add_aoa(ws, [['Danh sách sinh viên']], { origin: 'B1' });

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Danh sách sinh viên tham gia');
        XLSX.writeFile(wb, 'DanhSachSinhVien.xlsx');
    };

    useEffect(() => {
        getBrowsedUser();
    }, [getBrowsedUser]);

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
                <h2 className={cx('title')}>{row[0]?.work.name}</h2>
                <div className={cx('control')}>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Ngày bắt đầu:</span>
                        <span className={cx('more-number')}>
                            {console.log('row...', row)}
                            <Moment local="vi" format="ll">
                                {row[0]?.work.startDate}
                            </Moment>
                        </span>
                    </div>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Nơi làm việc:</span>
                        <span className={cx('more-number')}>{row[0]?.work.workPlace}</span>
                    </div>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Tối đa: </span>
                        <span className={cx('more-number')}>{row[0]?.work.maxStudent}</span>
                    </div>

                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Đã duyệt: </span>
                        <span className={cx('more-number')}>{row[0]?.work.curStudent}</span>
                    </div>

                    <div className={cx('wrap-more')}>
                        <Button variant="outline-success" className={cx('btn-export')} onClick={handleClickExportFile}>
                            Xuất ra file
                            <FontAwesomeIcon icon={faFileExcel} />
                        </Button>
                    </div>
                </div>
                {/* <div className={cx('note')}>
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
                </div> */}

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
                                            Ngày đăng ký
                                        </Col>
                                    </Row>

                                    {row.map((row, i) => (
                                        <RowTableWork
                                            key={i}
                                            stt={i + 1}
                                            mssv={row.userWork.id}
                                            name={row.userWork.name}
                                            email={row.userWork.email}
                                            className={row.userWork.className}
                                        />
                                    ))}
                                </>
                            ) : (
                                <div className={cx('done')}>Các yêu cầu đã được xử lý! </div>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default ListUserWork;
