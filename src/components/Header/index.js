import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, isLoginSelector } from '~/redux/selector';
import { userSlice } from '~/redux/reducers';
import logo from '../../assets/images/logo_CTU.png';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const userActions = userSlice.actions;
    const isLogined = useSelector(isLoginSelector);
    const userData = useSelector(userSelector);

    const handleCLickLoggout = () => {
        dispatch(userActions.toggleUserLogin());
    };

    return (
        <div className={cx('wrap', 'container')}>
            <div className={cx('wrapper')}>
                <Row className="h-100 align-items-center px-3">
                    <Col md={3}>
                        <div className={cx('logo')}>
                            <Image rounded roundedCircle thumbnail src={`${logo}`} />
                        </div>
                    </Col>

                    <Col md={5} className="offset-4">
                        <h2 className={cx('text-content')}>
                            {!isLogined ? (
                                <i>Chúng ta là tình nguyện viên!</i>
                            ) : (
                                <div>
                                    <span style={{ margin: '0 8px 0 0' }}>
                                        {' '}
                                        <i>Xin Chào</i>
                                    </span>
                                    <span>{userData.name}</span>
                                    <a href="/login" title="Sign out?" onClick={handleCLickLoggout}>
                                        <FontAwesomeIcon className={cx('icon-out')} icon={faArrowRightFromBracket} />
                                    </a>
                                </div>
                            )}
                        </h2>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Header;
