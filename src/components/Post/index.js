import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);
function Post({ author, content, upDate }) {
    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <h2>Author: {author}</h2>
            </div>
            <hr />
            <div className={cx('main')}>
                <p>{content}</p>
            </div>
            <hr />

            <div className={cx('footer')}>
                <Row>
                    <Col sm={4} className={cx('offset-8', 'date-status')}>
                        <i>{upDate}</i>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Post;
