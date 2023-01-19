import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrap')}>
            <hr />

            <Container>
                <Row>
                    <Col sm={12}>
                        <h2 className={cx('title')}>
                            &#169; Web thực hiện công tác tình nguyện của các bạn sinh viên trực thuộc CTU
                        </h2>
                    </Col>

                    <Col sm={12}>
                        <Row>
                            <Col sm={6} className="offset-3 mt-4">
                                <div className={cx('card', 'text-center', 'p-2')}>
                                    <h3 className="mb-3">Trường Đại học Cần Thơ (Can Tho University)</h3>
                                    <p>Khu II, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.</p>
                                    <p>
                                        Điện thoại: (84-292) 3832663 - (84-292) 3838474; Fax: (84-292) 3838474; Email:
                                        dhct@ctu.edu.vn.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
