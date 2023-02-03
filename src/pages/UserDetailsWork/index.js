import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Work from '~/components/Work';
import { workServices } from '~/services';

import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserDetailsWork.module.scss';

const cx = classNames.bind(styles);

const links = [{ name: 'Trang chủ', to: '/' }];

function UserDetailsWork() {
    const [workBrowsed, setWorkBrowsed] = useState([]);
    const currUser = useSelector(userSelector);
    const getWorks = useCallback(async () => {
        const res = await workServices.getNameWorkUser(currUser.id, 1);
        if (res.errCode === 0) {
            setWorkBrowsed(res.works);
        }
    }, [currUser.id]);

    useEffect(() => {
        getWorks();
    }, [getWorks]);

    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}>
                <Header links={links} />
                <div className={cx('main')}>
                    <h2 className={cx('notication')}>Chi tiết lịch tham gia tình nguyện của bạn</h2>

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
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default UserDetailsWork;
