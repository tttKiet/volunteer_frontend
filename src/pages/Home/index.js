import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

const cx = classNames.bind(styles);

function Home({ isLogined }) {
    const navigate = useNavigate();
    if (!isLogined) {
        return navigate('/login');
    }

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
