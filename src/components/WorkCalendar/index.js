import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faBackward } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';
import { workServices } from '~/services';
import Work from '../Work';
import classNames from 'classnames/bind';
import styles from './WorkCalendar.module.scss';

const cx = classNames.bind(styles);

function WorkCalendar() {
    const currUser = useSelector(userSelector);
    const [workBrowsed, setWorkBrowsed] = useState([]);
    const [details, setDetails] = useState(false);

    const handleClickDetails = () => {
        setDetails(true);
    };

    useEffect(() => {
        const getWorks = async () => {
            const res = await workServices.getNameWorkUser(currUser.id, 1);
            if (res.errCode === 0) {
                setWorkBrowsed(res.works);
            }
        };
        getWorks();
    }, []);

    return (
        <div className={cx('wrap')}>
            <h2
                className={cx('notications', {
                    details,
                })}
            >
                {details ? (
                    <>
                        <div className={cx('icon-back')} onClick={() => setDetails(false)}>
                            <FontAwesomeIcon icon={faBackward} />
                            Quay lại
                        </div>
                        Chi tiết
                    </>
                ) : (
                    <>Lịch Tham gia tình nguyện của bạn</>
                )}
            </h2>
            {!details ? (
                <>
                    <div className={cx('calendar')}>
                        {workBrowsed.map((work) => {
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

                        {workBrowsed.length > 0 ? (
                            <span className={cx('datails')} onClick={handleClickDetails}>
                                Xem chi tiết
                            </span>
                        ) : (
                            <span className={cx('datails')}>Bạn chưa có lịch </span>
                        )}
                    </div>
                </>
            ) : (
                <div>
                    <div className={cx('table')}>
                        <div className={cx('row', 'mr_-20')}>
                            {workBrowsed.map((work) => {
                                return (
                                    <Work
                                        key={work.id}
                                        startDate={work.work.startDate}
                                        name={work.work.name}
                                        workPlace={work.work.workPlace}
                                        curStudent={work.work.curStudent}
                                        maxStudent={work.work.maxStudent}
                                        pointPlus={work.work.pointPlus}
                                        note={work.work.note}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkCalendar;
