import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { UilBorderLeft } from '@iconscout/react-unicons';
import logo from '../../assets/images/logo2.png';
import { Row, Col, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '~/redux/selector';
import { userSlice } from '~/redux/reducers';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ links }) {
    const dispatch = useDispatch();
    const ref = useRef();
    const userActions = userSlice.actions;
    const userData = useSelector(userSelector);

    const handleCLickLoggout = () => {
        dispatch(userActions.toggleUserLogin());
    };

    useEffect(() => {
        const handleScrollTop = (e) => {
            const headerElement = ref.current;
            const scrollTop = window.scrollY;
            if (scrollTop > 60) {
                headerElement.classList.add(cx('re-active'));
            } else {
                headerElement.classList.remove(cx('re-active'));
            }
        };
        window.addEventListener('scroll', handleScrollTop);
    }, []);

    return (
        <div ref={ref} className={cx('wrap', '')}>
            <div className={cx('wrapper')}>
                <Row className="h-100 align-items-center  px-3">
                    <Col md={3}>
                        <Link to="/" className={cx('logo')}>
                            <Image className={cx('logo-image')} src={`${logo}`} />
                        </Link>
                    </Col>
                    <Col md={6}>
                        <ul className="nav justify-content-end nav-pills justify-content-end">
                            {links &&
                                links.map((link, i) => (
                                    <li key={i + 'linksHeader'} className="nav-item mx-2">
                                        <Link
                                            className={cx('nav-link', 'nav-item-link')}
                                            style={{ fontSize: 14 }}
                                            to={link.to}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </Col>

                    <Col md={3}>
                        <h2 className={cx('text-content')}>
                            <span>
                                Hi <b>{userData.id} !</b>
                            </span>
                            <Link to="/login" title="Sign out?" onClick={handleCLickLoggout}>
                                <FontAwesomeIcon className={cx('icon-out')} icon={faArrowRightFromBracket} />
                            </Link>
                        </h2>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Header;
