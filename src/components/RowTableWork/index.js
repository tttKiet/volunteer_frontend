import { Row, Col } from 'react-bootstrap';

import styles from './RowTableWork.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function RowTableWork({ id, stt, mssv, name, email, className }) {
    return (
        <>
            <Row className={cx('wrap')}>
                <Col md={1} className={cx('desc')}>
                    {stt}
                </Col>
                <Col md={2} className={cx('desc')}>
                    {mssv}
                </Col>
                <Col md={2} className={cx('desc')}>
                    {name}
                </Col>
                <Col md={3} className={cx('desc')}>
                    {email}
                </Col>
                <Col md={1} className={cx('desc')}>
                    {className}
                </Col>
                <Col md={2} className={cx('desc')}>
                    20/22/2000
                </Col>
            </Row>
        </>
    );
}

export default RowTableWork;
