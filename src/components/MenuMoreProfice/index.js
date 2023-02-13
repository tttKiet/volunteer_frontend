import { UilSignout } from '@iconscout/react-unicons';
import { UilBrightnessLow } from '@iconscout/react-unicons';
import { userSlice } from '~/redux/reducers';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './MenuMoreProfice.module.scss';

const cx = classNames.bind(styles);

function MenuMoreProfice({ show }) {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(userSlice.actions.toggleUserLogin());
    };

    return (
        <div
            className={cx('wrap', {
                show: show,
            })}
        >
            <ul className={cx('list')}>
                <li className={cx('item')}>
                    <h3>Chế độ tối</h3>
                    <UilBrightnessLow size={20} className={cx('icon')} />
                </li>
                <li className={cx('item')}>
                    <h3>Đang cập nhật ...</h3>
                </li>
                <li className={cx('item')} onClick={handleLogout}>
                    <h3>Đăng xuất</h3>
                    <UilSignout className={cx('icon')} size={20} />
                </li>
            </ul>
        </div>
    );
}

export default MenuMoreProfice;
