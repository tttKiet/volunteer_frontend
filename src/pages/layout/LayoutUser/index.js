import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong, faCircle, faFish, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import gifPost from '../../../assets/gif/Mail.gif';
import gifUser from '../../../assets/gif/user-home-2.gif';
import HomeUser from '~/components/HomeUser';
import styles from './LayoutUser.module.scss';
import { userSlice } from '~/redux/reducers';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();
    const eRef = useRef();
    const [currComponent, setCurrComponent] = useState('view-post');
    const [currPage, setCurrPage] = useState('home');

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

    const handleClickLogout = () => {
        dispatch(userSlice.actions.toggleUserLogin());
    };

    const handleClickShowContent = () => {
        setShowContent((show) => !show);
        setCurrPage('home');
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
                    <div
                        className={cx({
                            'cic-active': currPage === 'home',
                        })}
                    >
                        <FontAwesomeIcon icon={faCircle} />
                    </div>
                    <div
                        className={cx({
                            'cic-active': currPage === 'stated',
                        })}
                    >
                        <FontAwesomeIcon icon={faCircle} />
                    </div>
                    <div
                        className={cx({
                            'cic-active': currPage === 'contact',
                        })}
                    >
                        <FontAwesomeIcon icon={faCircle} />
                    </div>
                </div>
                <div
                    className={cx('control', {
                        show: showContent,
                    })}
                    onClick={() => handleClickShowContent()}
                >
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
                            <li
                                onClick={() => setCurrPage('home')}
                                className={cx('controls-item', {
                                    active: currPage === 'home',
                                })}
                            >
                                <a href="#home">NHÀ</a>
                            </li>
                            <li
                                onClick={() => setCurrPage('stated')}
                                className={cx('controls-item', {
                                    active: currPage === 'stated',
                                })}
                            >
                                <a href="#stated">BẮT ĐẦU</a>
                            </li>
                            <li
                                onClick={() => setCurrPage('contact')}
                                className={cx('controls-item', {
                                    active: currPage === 'contact',
                                })}
                            >
                                <a href="#contact">LIÊN HỆ</a>
                            </li>
                        </ul>

                        <div className={cx('icon-out')}>
                            <div className={cx('logout')}>
                                <h2>kietb2014754@student.ctu.edu.vn</h2>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faCaretDown} />

                                    <div className={cx('menu')}>
                                        <h2>B2014754</h2>
                                        <ul>
                                            <li onClick={handleClickLogout}>Đăng xuất</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
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
