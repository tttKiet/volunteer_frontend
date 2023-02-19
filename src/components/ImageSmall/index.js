import classNames from 'classnames/bind';
import styles from './ImageSmall.module.scss';
const cx = classNames.bind(styles);

function ImageSmall({ src }) {
    return (
        <div className={cx('wrap')}>
            <img src={src}></img>
        </div>
    );
}

export default ImageSmall;
