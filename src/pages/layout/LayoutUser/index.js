import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong, faCircle, faFish } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import gifPost from '../../../assets/gif/Mail.gif';
import gifUser from '../../../assets/gif/user-home-2.gif';
import HomeUser from '~/components/HomeUser';
import styles from './LayoutUser.module.scss';
import classNames from 'classnames/bind';
import HomeUserSLide from '~/components/HomeUserSLide';
import StatedUserSLide from '~/components/StatedUserSLide';
import ContactUserSLide from '~/components/ContactUserSLide';
import UserListWork from '~/pages/UserListWork';
import UserDetailsWork from '~/pages/UserDetailsWork';
import WorkCalendar from '~/components/WorkCalendar';
import UserRegister from '~/components/UserRegister';

const cx = classNames.bind(styles);

function LayoutUser() {
    const elementRef = useRef(null);
    const eRef = useRef();
    const [currComponent, setCurrComponent] = useState('view-post');

    const [showContent, setShowContent] = useState(false);

    const handleClickControl = (type) => {
        switch (type) {
            case 'calendar': {
                setCurrComponent('calendar');
                break;
            }
            case 'list': {
                setCurrComponent('list');
                break;
            }
            case 'register': {
                setCurrComponent('register');
                break;
            }
            case 'view-post': {
                setCurrComponent('view-post');
                break;
            }
            default: {
                break;
            }
        }
    };

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
                    <div className={cx('controls')}>
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
                    </div>
                </div>

                <div className={cx('slides')}>
                    <HomeUserSLide className={cx('slide')} />
                    <StatedUserSLide className={cx('slide')} />
                    <ContactUserSLide className={cx('slide')} />
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
                            <h2 className={cx('title')}>HELLO !!!</h2>
                            <img src={gifPost}></img>
                        </div>

                        <div className={cx('control-box')} onClick={(e) => handleClickControl('view-post')}>
                            <div
                                className={cx('icon', {
                                    show: currComponent === 'view-post',
                                })}
                            >
                                <FontAwesomeIcon icon={faFish} />
                            </div>
                            <h2 className={cx('title')}>Các bài post tiêu biểu</h2>
                        </div>
                        <div className={cx('control-box')} onClick={(e) => handleClickControl('list')}>
                            <div
                                className={cx('icon', {
                                    show: currComponent === 'list',
                                })}
                            >
                                <FontAwesomeIcon icon={faFish} />
                            </div>
                            <h2 className={cx('title')}>Xem Danh Mục Công Việc</h2>
                        </div>
                        <div className={cx('control-box')} onClick={(e) => handleClickControl('calendar')}>
                            <div
                                className={cx('icon', {
                                    show: currComponent === 'calendar',
                                })}
                            >
                                <FontAwesomeIcon icon={faFish} />
                            </div>
                            <h2 className={cx('title')}>Xem Lịch Tham Gia</h2>
                        </div>
                        <div className={cx('control-box')} onClick={(e) => handleClickControl('register')}>
                            <div
                                className={cx('icon', {
                                    show: currComponent === 'register',
                                })}
                            >
                                <FontAwesomeIcon icon={faFish} />
                            </div>
                            <h2 className={cx('title')}>Đăng Ký Tham Gia </h2>
                        </div>
                    </div>
                    <div className={cx('main')}>
                        {(currComponent === 'home' && <HomeUser />) ||
                            (currComponent === 'list' && <UserListWork />) ||
                            (currComponent === 'register' && <UserRegister />) ||
                            (currComponent === 'calendar' && <WorkCalendar />) ||
                            (currComponent === 'view-post' && <HomeUser />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutUser;
