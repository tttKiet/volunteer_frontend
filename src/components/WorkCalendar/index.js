import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';
import { workServices } from '~/services';

import classNames from 'classnames/bind';
import styles from './WorkCalendar.module.scss';

const cx = classNames.bind(styles);

function WorkCalendar() {
    const currUser = useSelector(userSelector);
    const [works, setWorks] = useState([]);
    const getWorks = useCallback(async () => {
        const res = await workServices.getNameWorkUser(currUser.id);
        if (res.errCode === 0) {
            setWorks(res.works);
        }
    }, [currUser.id]);

    useEffect(() => {
        getWorks();
    }, [getWorks]);

    return (
        <>
            <h2 className={cx('notications')}>Lịch Tham gia tình nguyện của bạn </h2>
            <div className={cx('calendar')}>
                {works.map((work) => {
                    return (
                        <div key={work.id} className={cx('group-time')}>
                            <FontAwesomeIcon icon={faMinus} />
                            <span className={cx('time-text')}>
                                {moment(work.work.startDate).format('L')} (
                                {moment(work.work.startDate).endOf().fromNow()} )
                            </span>
                            <span className={cx('time-text')}> , {work.work.name}</span>
                            <span className={cx('time-text')}>, {work.work.workPlace}</span>
                        </div>
                    );
                })}

                <a href="/user/details-work" className={cx("datails")}>Xem chi tiết</a>
            </div>
        </>
    );
}

export default WorkCalendar;
