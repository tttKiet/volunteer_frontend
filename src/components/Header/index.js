import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Row, Col, Image } from 'react-bootstrap';
import logo from '../../assets/images/logo_CTU.png';

const cx = classNames.bind(styles);

function Header() {
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
                            <i>Chúng ta là tình nguyện viên!</i>
                        </h2>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Header;
