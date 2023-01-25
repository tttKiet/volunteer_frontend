import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import moment from 'moment';

const cx = classNames.bind(styles);
function Post({ author, title, content, upDate }) {
    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <p>
                    Author: {author} : <b className="mx-2">{title}</b>
                </p>
            </div>
            <hr />
            <div className={cx('main')}>
                <p>{content}</p>
            </div>
            <hr />

            <div className={cx('footer')}>
                <Row>
                    <Col sm={4} className={cx('offset-8', 'date-status')}>
                        <i>{moment(upDate).startOf().fromNow()}</i>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Post;
