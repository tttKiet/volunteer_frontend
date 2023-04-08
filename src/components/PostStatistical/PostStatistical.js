import PostChart from '../PostChart/PostChart';
import { useState } from 'react';
// Scss
import styles from './PostStatistical.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function PostStatistical() {
    return (
        <div className={cx('wrap')}>
            <div>
                <PostChart />

                <div className={cx('footer')}>
                    <hr></hr>
                </div>
            </div>
        </div>
    );
}

export default PostStatistical;
