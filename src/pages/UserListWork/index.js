import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Work from '~/components/Work';
import { workServices } from '~/services';
import classNames from 'classnames/bind';
import styles from './UserListWork.module.scss';
import { useCallback, useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const links = [{ name: 'Trang chủ', to: '/' }];

function UserListWork() {
    const [work, setWork] = useState([]);

    const getWork = useCallback(async () => {
        const res = await workServices.getNameWork();
        if (res.errCode === 0) {
            setWork(res.workNames);
        }
    }, []);

    useEffect(() => {
        getWork();
    }, [getWork]);

    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}>
                <Header links={links} />
                <div className={cx('content')}>
                    <h2 className={cx('title')}>Danh sách các công việc có thể đăng ký</h2>
                    <div className={cx('row', 'mr_-20')}>
                        {work.map((work) => {
                            console.log(work);
                            return (
                                <Work
                                    key={work.id}
                                    startDate={work.startDate}
                                    name={work.name}
                                    workPlace={work.workPlace}
                                    curStudent={work.curStudent}
                                    maxStudent={work.maxStudent}
                                    pointPlus={work.pointPlus}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserListWork;
