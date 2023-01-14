import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSlice } from '~/redux/reducers';

import { Row, Col } from 'react-bootstrap';
import Slide from '~/components/Carousel/Carousel';
import Header from '~/components/Header';
import cr1 from '../../assets/images/cr1.jpg';
import cr2 from '../../assets/images/cr2.jpg';
import cr3 from '../../assets/images/cr3.jpg';
import cr4 from '../../assets/images/cr4.jpg';
import FormLogin from '~/components/FormLogin';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);
const imgItems = [
    {
        link: cr1,
        alt: 'First',
        title: 'TN',
        content: 'asdsads test',
    },
    {
        link: cr2,
        alt: 'First2',
        title: 'TN',
        content: 'asdsads test',
    },
    {
        link: cr3,
        alt: 'First3',
        title: 'TN',
        content: 'asdsads test',
    },
    {
        link: cr4,
        alt: 'First4',
        title: 'TN',
        content: 'asdsads test',
    },
];

function Login() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const handleLogin = () => {
    //     dispatch(userSlice.actions.toggleUserLogin());
    //     navigate('/');
    // };

    return (
        <div className={cx('wrap')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('wrapper', 'py-5')}>
                    <Row>
                        <Col md={5}>
                            <div
                                className={cx('wrap__slide', 'd-flex', 'justify-content-center', 'align-items-center')}
                            >
                                <Slide imgItems={imgItems} />
                            </div>
                        </Col>
                        <Col md={7}>
                            <div className={cx('wrap__form', 'd-flex', 'justify-content-center')}>
                                <FormLogin />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Login;
