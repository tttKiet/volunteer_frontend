import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return <div className={cx('wrap')}> Header</div>;
}

export default Header;
