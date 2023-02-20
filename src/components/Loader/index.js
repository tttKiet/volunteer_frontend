import classNames from 'classnames/bind';
import styles from './Loader.scss';
const cx = classNames.bind(styles);

function Loader() {
    return (
        // <div className={cx('wrap-loader')}>
        <div className={cx('dot-spinner')}>
            <div className={cx('dot-spinner__dot')}></div>
            <div className={cx('dot-spinner__dot')}></div>
            <div className={cx('dot-spinner__dot')}></div>
            <div className={cx('dot-spinner__dot')}></div>
            <div className={cx('dot-spinner__dot')}></div>
            <div className={cx('dot-spinner__dot')}></div>
            <div className={cx('dot-spinner__dot')}></div>
            <div className={cx('dot-spinner__dot')}></div>
        </div>
        // </div>
    );
}

export default Loader;
