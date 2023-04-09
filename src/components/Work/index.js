import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import MoreWork from '../MoreWork';
import { Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Work.module.scss';

const cx = classNames.bind(styles);

function Work({
    id,
    getWorks,
    startDate,
    name,
    workPlace,
    curStudent,
    maxStudent,
    pointPlus,
    countRequest,
    note,
    admin = false,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const workRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        if (workRef.current) {
            observer.observe(workRef.current);
        }

        return () => {
            if (workRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(workRef.current);
            }
        };
    }, []);

    return (
        <div
            className={cx('wrap', {
                visible: isVisible,
            })}
        >
            <div className={cx('wrap-item')} ref={workRef}>
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
                {!admin && <MoreWork id={id} getWorks={getWorks} />}
            </div>
        </div>
    );
}

export default Work;
