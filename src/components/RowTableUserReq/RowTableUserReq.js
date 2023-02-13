import { Row, Col, Button } from 'react-bootstrap';
import { UilCheck } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import { workServices } from '~/services';
import styles from './RowTableUserReq.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function RowTableUserReq({
    id,
    workId,
    stt,
    mssv,
    name,
    email,
    className,
    handleRender,
    getNameWorkAndCountRes,
    toggleShowToast,
}) {
    const handleClickCheck = async () => {
        const res = await workServices.workBrowse(id);
        if (res.errCode === 0) {
            handleRender(workId);
            getNameWorkAndCountRes();
            toggleShowToast({ show: true, header: 'Xong', content: 'Duyệt thành công' });
        }
    };

    const handleClickDelete = () => {};

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
                    <Button size="sm" className={cx('btn')} variant="outline-primary" onClick={handleClickCheck}>
                        <UilCheck size={18} />
                    </Button>
                    <Button size="sm" className={cx('btn')} variant="outline-danger" onClick={handleClickDelete}>
                        <UilTimes size={18} />
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default RowTableUserReq;
