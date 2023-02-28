import { Col } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './WorkInList.module.scss';
const cx = classNames.bind(styles);

function WorkInList({ stt, name, place, maxStudent, curStudent, pointPlus, startDate }) {
    const elementRef = useRef();
    const [isVisible, setIsVisible] = useState(false);

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

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);
    return (
        <Col
            md={6}
            ref={elementRef}
            className={cx('item', {
                show: isVisible,
            })}
        >
            <div className={cx('wrap')}>
                <h3 className={cx('time')}>
                    <span className={cx('stt')}>{stt}</span>
                    <span className={cx('date')}>
                        Ngày
                        <Moment local="vi" format="ll" date={startDate} />
                    </span>
                </h3>
                <div className={cx('card')}>
                    <div className="row">
                        <Col sm={12}>
                            <div className={cx('work')}>
                                <span className={cx('name')}>{name}</span>
                                <div className={cx('place')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faLocationDot} />
                                    </span>
                                    ({place})
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} className={cx('main')}>
                            <div className={cx('border')}>
                                <div className={cx('students')}>
                                    <div className={cx('number')}>
                                        Số lượng: <b>{maxStudent}</b> sinh viên
                                    </div>
                                    <div className={cx('number')}>
                                        Đã duyệt: <b>{curStudent}</b> sinh viên
                                    </div>
                                </div>
                                <div className={cx('profits')}>
                                    <ul className={cx('point')}>
                                        <b> Quyền lợi</b>
                                        <li>
                                            +<b>{pointPlus}</b> điểm rèn luyện
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className={cx('right')}>
                                <button type="button">Đăng ký ngay</button>
                            </div>
                        </Col>
                    </div>
                </div>
            </div>
        </Col>
    );
}

export default WorkInList;
