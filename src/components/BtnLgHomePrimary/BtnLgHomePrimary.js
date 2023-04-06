import styles from './BtnLgHomePrimary.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function BtnLgHomePrimary() {
    return (
        <div className={cx('wrap')}>
            <button type="button" className={cx('btn')}>
                <strong>Tham gia ngay</strong>
                <div className={cx('container-stars')}>
                    <div className={cx('stars')}></div>
                </div>

                <div className={cx('glow')}>
                    <div className={cx('circle')}></div>
                    <div className={cx('circle')}></div>
                </div>
            </button>
        </div>
    );
}

export default BtnLgHomePrimary;
