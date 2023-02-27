import classNames from 'classnames/bind';
import styles from './UserListWork.module.scss';

const cx = classNames.bind(styles);

function UserListWork() {
    return (
        <div className={cx('wrap')}>
            <div>
                <h1 className={cx('title')}> Danh sách tổ chức các công việc cho tình nguyện viên sắp tới</h1>
            </div>

            <div></div>
        </div>
    );
}

export default UserListWork;
