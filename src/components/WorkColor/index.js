import classNames from 'classnames/bind';
import Moment from 'react-moment';
import styles from './WorkColor.module.scss';
const cx = classNames.bind(styles);

function WorkColor({ id, title, time, number, handleClickView }) {
    return (
        <div className={cx('wrap', 'col-md-4')}>
            <div className={cx('name')} title="hien mau">
                <h2 className={cx('title')}>{title}</h2>
            </div>

            <div className={cx('card')}>
                <h3 className={cx('time')}>
                    <Moment local="vi" format="ll" date={time} />
                </h3>
                <span className={cx('number')}>
                    Số lượng đã duyệt: <span>{number}</span>
                </span>
                <div className={cx('view')} onClick={() => handleClickView(id)}>
                    <p> Xem ngay</p>
                </div>
            </div>
        </div>
    );
}

export default WorkColor;
