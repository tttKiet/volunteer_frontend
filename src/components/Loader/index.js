import classNames from 'classnames/bind';
import styles from './Loader.scss';
const cx = classNames.bind(styles);

function Loader() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('loader')}>
                <div id="first">
                    <div id="second">
                        <div id="third"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loader;
