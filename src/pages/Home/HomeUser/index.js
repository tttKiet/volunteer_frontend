import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './HomeUser.module.scss';
import { Col, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);

function HomeUser() {
    const elementRef = useRef(null);
    const [showContent, setShowContent] = useState(false);
    return (
        <div className={cx('wrap')}>
            <div className={cx('nav-color')}>
                <div className={cx('logo')}>
                    <FontAwesomeIcon icon={faCircle} />
                </div>
                <div className={cx('circle')}>
                    <FontAwesomeIcon icon={faCircle} />
                    <FontAwesomeIcon icon={faCircle} />
                    <FontAwesomeIcon icon={faCircle} />
                    <FontAwesomeIcon icon={faCircle} />
                    <FontAwesomeIcon icon={faCircle} />
                    <FontAwesomeIcon icon={faCircle} />
                </div>
                <div className={cx('control')} onClick={() => setShowContent((show) => !show)}>
                    <FontAwesomeIcon icon={faArrowAltCircleUp} />
                </div>
            </div>
            <div className={cx('header')}>
                <div className={cx('header-nav')}>
                    <div className={cx('logo')}>
                        <h3>
                            <span>VOLL</span>UNTER
                        </h3>
                    </div>
                    <div className={cx('controls')}>
                        <ul className={cx('controls-list')}>
                            <li className={cx('controls-item')}>
                                <Link to="#">Bắt đầu</Link>
                            </li>
                            <li className={cx('controls-item')}>
                                <Link to="#">Liên hệ</Link>
                            </li>
                        </ul>

                        <div className={cx('icon-out')}>
                            <FontAwesomeIcon icon={faRightLong} />
                        </div>
                    </div>
                </div>

                <div className={cx('header-content')}>
                    <h3 className={cx('title2')}>Xin Chào Bùi Tuấn Kiệt! </h3>
                    <h3 className={cx('title1')}>
                        "Trải nghiệm tình nguyện viên - Cùng chúng tôi lan tỏa yêu thương và sự đồng cảm đến mọi người"
                    </h3>
                    <span className={cx('content')}>
                        Tình nguyện viên là những người có tâm huyết và mong muốn thay đổi thế giới bằng cách đóng góp
                        cho cộng đồng và xã hội. Tình nguyện viên không chỉ giúp đỡ người khác mà còn tạo nên những trải
                        nghiệm ý nghĩa và đáng nhớ cho chính bản thân họ.
                    </span>
                </div>
            </div>

            <div
                className={cx('content', {
                    show: showContent,
                })}
            >
                <Row>
                    <Col sm={3}>asds</Col>
                    <Col sm={5}>asds</Col>
                    <Col sm={4}>asds</Col>
                </Row>
            </div>
        </div>
    );
}

export default HomeUser;
