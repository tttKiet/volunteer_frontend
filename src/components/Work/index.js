import moment from 'moment';
import { Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Work.module.scss';

const cx = classNames.bind(styles);

function Work({ startDate, name, workPlace, curStudent, maxStudent, pointPlus, countRequest, note }) {
    return (
        <div className={cx('wrap')}>
            <div className={cx('wrap-item')}>
                <div className={cx('item')}>
                    <div className="row">
                        <Col sm={4} className={cx('title')}>
                            Thời gian
                        </Col>
                        <Col sm={4} className={cx('title')}>
                            Tên công việc
                        </Col>
                        <Col sm={4} className={cx('title')}>
                            Nơi làm việc
                        </Col>
                    </div>
                    <div className="row mb-2">
                        <Col sm={4} className={cx('name-main')}>
                            {moment(startDate).format('L')} ({moment(startDate).endOf().fromNow()} )
                        </Col>
                        <Col sm={4} className={cx('name-main')}>
                            {name}
                        </Col>
                        <Col sm={4} className={cx('name-main')}>
                            {workPlace}
                        </Col>
                    </div>

                    <div className="row">
                        <Col sm={12} className={cx('more')}>
                            <hr />
                            <h2>Thông tin thêm</h2>
                        </Col>
                    </div>
                    <div className="row">
                        <Col sm={4}>
                            <span className={cx('more-content')}>Số sinh viên đã đăng ký:</span>
                        </Col>
                        <Col sm={3}>
                            <span className={cx('more-number')}>{curStudent}</span>
                        </Col>
                        {countRequest && (
                            <>
                                <Col sm={3}>
                                    <span className={cx('more-content')}>Số yêu cầu: </span>
                                </Col>
                                <Col sm={2}>
                                    <span className={cx('more-number')}>{countRequest}</span>
                                </Col>
                            </>
                        )}
                    </div>
                    <div className="row">
                        <Col sm={4}>
                            <span className={cx('more-content')}>Số sinh viên tối đa:</span>
                        </Col>
                        <Col sm={8}>
                            <span className={cx('more-number')}>{maxStudent}</span>
                        </Col>
                    </div>
                    <div className="row">
                        <Col sm={4}>
                            <span className={cx('more-content')}>Điểm được cộng:</span>
                        </Col>
                        <Col sm={8}>
                            <span className={cx('more-number')}>{pointPlus}</span>
                        </Col>
                    </div>

                    <div className="row">
                        <Col sm={10}>
                            <span className={cx('more-content')}>
                                <b>Ghi chú:</b>
                            </span>
                            <span className={cx('more-number')}>
                                <pre>{note}</pre>
                            </span>
                        </Col>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Work;
