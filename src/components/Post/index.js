import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import moment from 'moment';

import imageTest from '../../assets/images/home-admin-slide4.jpg';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Post({ author, title, content, upDate, light = true }) {
    const [viewMore, setViewMore] = useState(false);
    const [desc, setDesc] = useState(() => {
        if (content.length > 100) {
            setViewMore(true);
            return content.slice(0, 100);
        } else {
            return content;
        }
    });

    const setContent = () => {
        return !viewMore ? content.slice(0, 100) : content;
    };

    const handleClickMore = () => {
        setDesc(setContent());
        setViewMore((viewMore) => !viewMore);
    };

    return (
        <div className={cx('wrap')}>
            <div
                className={cx('header', {
                    'header-light': light,
                })}
            >
                <b>{author}</b>
                <span className={cx('dot')}> • </span>
                <span className={cx('time')}>{moment(upDate).startOf().fromNow()}</span>
            </div>
            <div className={cx('main')}>
                <img className={cx('image-up')} src={imageTest} alt="test" />
            </div>

            <div className={cx('footer', { 'footer-light': light })}>
                <div>
                    <h2 className={cx('title')}>{title}</h2>

                    <span className={cx('desc')}>
                        {desc}
                        {viewMore ? (
                            <span>
                                <span> ... </span>
                                <span className={cx('more')} onClick={handleClickMore}>
                                    [xem thêm]
                                </span>
                            </span>
                        ) : (
                            <span>
                                <span className={cx('more')} onClick={handleClickMore}>
                                    {desc.length > 100 ? '[ẩn]' : ''}
                                </span>
                            </span>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Post;
