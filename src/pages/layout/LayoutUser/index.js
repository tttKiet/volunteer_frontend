import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useSpring, animated } from '@react-spring/web';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import gifPost from '../../../assets/gif/Mail.gif';
import gifUser from '../../../assets/gif/user-home-2.gif';
import styles from './LayoutUser.module.scss';
import HomeUser from '~/components/HomeUser';

const cx = classNames.bind(styles);

function LayoutUser() {
    const elementRef = useRef(null);

    const [props, api] = useSpring(
        () => ({
            from: { opacity: 0 },
            to: { opacity: 1 },
        }),
        [],
    );

    const [showContent, setShowContent] = useState(false);
    return (
        <div className={cx('wrap')}>
            <div
                className={cx('nav-color', {
                    showContent: showContent,
                })}
            >
                <div className={cx('logo')}>
                    <FontAwesomeIcon icon={faCircle} />
                </div>
                <div className={cx('circle')}>
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
                        <a href="#home">
                            <span>VOLL</span>UNTER
                        </a>
                    </div>
                    <animated.div style={props} className={cx('controls')}>
                        <ul className={cx('controls-list')}>
                            <li className={cx('controls-item')}>
                                <a href="#stated">Bắt đầu</a>
                            </li>
                            <li className={cx('controls-item')}>
                                <a href="#contact">Liên hệ</a>
                            </li>
                        </ul>

                        <div className={cx('icon-out')}>
                            <FontAwesomeIcon icon={faRightLong} />
                        </div>
                    </animated.div>
                </div>

                <div className={cx('slides')}>
                    <div className={cx('header-content', 'slide')} id="home">
                        <div>
                            <h3 className={cx('title2')}>Xin Chào Bùi Tuấn Kiệt! </h3>
                            <h3 className={cx('title1')}>
                                "Trải nghiệm tình nguyện viên - Cùng chúng tôi lan tỏa yêu thương và sự đồng cảm đến mọi
                                người"
                            </h3>
                            <span className={cx('content')}>
                                Tình nguyện viên là những người có tâm huyết và mong muốn thay đổi thế giới bằng cách
                                đóng góp cho cộng đồng và xã hội. Tình nguyện viên không chỉ giúp đỡ người khác mà còn
                                tạo nên những trải nghiệm ý nghĩa và đáng nhớ cho chính bản thân họ.
                            </span>
                        </div>
                        <div className={cx('header-img')}>
                            <img src={gifUser}></img>
                        </div>
                    </div>

                    <div className={cx('header-stated', 'slide')} id="stated">
                        <div>
                            <h3 className={cx('title2')}>Xin Chào Bùi Tuấn Kiệt! </h3>
                            <h3 className={cx('title1')}>
                                "Trải nghiệm tình nguyện viên - Cùng chúng tôi lan tỏa yêu thương và sự đồng cảm đến mọi
                                người"
                            </h3>
                            <span className={cx('content')}>
                                Tình nguyện viên là những người có tâm huyết và mong muốn thay đổi thế giới bằng cách
                                đóng góp cho cộng đồng và xã hội. Tình nguyện viên không chỉ giúp đỡ người khác mà còn
                                tạo nên những trải nghiệm ý nghĩa và đáng nhớ cho chính bản thân họ.
                            </span>
                        </div>
                        <div className={cx('header-img')}>
                            <img src={gifUser}></img>
                        </div>
                    </div>

                    <div className={cx('header-contact', 'slide')} id="contact">
                        <div>
                            <h3 className={cx('title2')}>Lien he </h3>
                            <h3 className={cx('title1')}>
                                "Trải nghiệm tình nguyện viên - Cùng chúng tôi lan tỏa yêu thương và sự đồng cảm đến mọi
                                người"
                            </h3>
                            <span className={cx('content')}>
                                Tình nguyện viên là những người có tâm huyết và mong muốn thay đổi thế giới bằng cách
                                đóng góp cho cộng đồng và xã hội. Tình nguyện viên không chỉ giúp đỡ người khác mà còn
                                tạo nên những trải nghiệm ý nghĩa và đáng nhớ cho chính bản thân họ.
                            </span>
                        </div>
                        <div className={cx('header-img')}>
                            <img src={gifUser}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={cx('content', {
                    show: showContent,
                })}
            >
                <div className={cx('wrap-control')}>
                    <div className={cx('control-user', 'ani-bg')}>
                        <div className={cx('title-img')}>
                            <h2 className={cx('title')}>Các bài post tiêu biểu</h2>
                            <img src={gifPost}></img>
                        </div>
                        <div className={cx('control-box')}>
                            <h2 className={cx('title')}>Xem Danh Mục Công Việc</h2>
                        </div>
                        <div className={cx('control-box')}>
                            <h2 className={cx('title')}>Xem Lịch Tham Gia </h2>
                        </div>
                        <div className={cx('control-box')}>
                            <h2 className={cx('title')}>Đăng Ký Tham Gia </h2>
                        </div>
                        <div className={cx('control-box')}>
                            <h2 className={cx('title')}>Các bài post tiêu biểu</h2>
                        </div>
                    </div>
                    <div className={cx('main')}>
                        <HomeUser />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutUser;
