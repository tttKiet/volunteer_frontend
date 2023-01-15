import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isLoginSelector } from '~/redux/selector';
import { userSlice } from '~/redux/reducers';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const login = useSelector(isLoginSelector);
    const [isLogined, setIsLogined] = useState(login);
    const navigate = useNavigate();

    const handleNavigate = useCallback(() => {
        if (!isLogined) {
            navigate('/login');
        }
    }, [isLogined, navigate]);

    useEffect(() => {
        handleNavigate();
    }, [handleNavigate, isLogined]);

    return (
        <div className={cx('wrap')}>
            <Container>
                <Row>
                    <Col md={12}>
                        <Header />
                    </Col>
                </Row>
                <Row>
                    <h2>Main</h2>
                </Row>

                <Row>
                    <Col md={12}>
                        <Footer />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
